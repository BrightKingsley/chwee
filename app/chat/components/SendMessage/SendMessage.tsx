// @ts-nocheck
"use client";

import React, {
  ChangeEvent,
  ChangeEventHandler,
  FormHTMLAttributes,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  PaperAirplaneIcon,
  PhotoIcon,
  WalletIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";

import { Swiper, SwiperSlide } from "swiper/react";

import { SendMessageType } from "./types";
import { AnimateInOut, Close } from "@/components";
import { ChatContext } from "@/context";
import ReactTextareaAutoSize from "react-textarea-autosize";
import { useParams } from "next/navigation";
import { MessageClass } from "@/models/Message";
import { BASE_URL } from "@/constants/routes";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

type MessageBody = {
  textContent: string;
  sendDate: Date;
  sender: string | undefined;
  // imageContent: (Blob | Uint8Array | ArrayBuffer)[];
  imageContent: (string | StaticImport)[];
  replyTo: {
    sender: string;
    textContent?: string;
    imageContent?: string[];
  };
};

interface HTMLInputEvent extends Event {
  target: HTMLIFrameElement & EventTarget;
}

export default function SendMessage({
  replyMessage,
  setReplyMessage,
  chatID,
  roomType,
}: SendMessageType) {
  const { data } = useSession();
  const session: Session | null = data;

  const [message, setMessage] = useState<MessageBody>({
    textContent: "",
    imageContent: [],
    sendDate: new Date(),
    //TODO check this (!)
    sender: session?.user.id!,
    replyTo: replyMessage,
  });

  const [showOthers, setShowOthers] = useState(true);
  const [toggleTransferForm, setToggleTransferForm] = useState(false);
  const [previewImages, setPreviewImages] = useState<{
    images: (string | any)[];
    show: boolean;
  }>({ images: [], show: false });

  // TODO COMEBACK

  useEffect(() => {
    setMessage((prev) => ({ ...prev, replyTo: replyMessage }));
  }, [replyMessage]);

  const resetInput = () => {
    console.log("resetting!");
    setMessage((prev) => ({ ...prev, textContent: "" }));
    setReplyMessage({ sender: "", imageContent: [], textContent: "" });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log("CHECK_SESSION", session);
      // TODO check this(!)
      setMessage((prev) => ({ ...prev, sender: session?.user.id! }));
    }, 2000);

    return () => clearTimeout(timeout);
  }, [session, session?.user, message.textContent]);

  const sendMessage = async () => {
    try {
      console.log("SENDING_MESSAGE ==>", message);
      const res = await fetch(`${BASE_URL}/api/messaging/${chatID}`, {
        method: "POST",
        body: JSON.stringify({ message, roomType }),
      });

      const result = await res.json();

      console.log("MSG_RESULT", result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSend = async (e: SubmitEvent) => {
    e.preventDefault();

    console.log("MSG_RES_TO_BE_SENT: ", message);

    if (!message) return;

    const res = await sendMessage();

    resetInput();
  };

  const readURI = (imgs: any[]) => {
    console.log("READ_REACHED", previewImages);
    imgs.forEach((img) => {
      if (img) {
        let reader = new FileReader();
        reader.onload = function (ev: ProgressEvent<FileReader>) {
          setPreviewImages((prev) => ({
            show: true,
            images: [...prev.images, ev.target?.result],
          }));
        };
        return reader.readAsDataURL(img);
      }
    });
  };

  useEffect(() => {
    return message.textContent ? setShowOthers(false) : setShowOthers(true);
  }, [message.textContent]);

  useEffect(() => {
    console.log("REPLY_MESSAGE_CHANGE", replyMessage);
  }, [
    replyMessage,
    replyMessage.textContent,
    replyMessage.sender,
    replyMessage.imageContent,
  ]);

  return (
    <div className="relative w-full">
      {previewImages.images.length > 0 && previewImages.show && (
        <AnimateInOut
          init={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          out={{ opacity: 0 }}
          show={previewImages.show}
          className="fixed h-[calc(100vh-3.5rem)] w-[calc(100vw-3.5rem)] bg-white top-14 right-0 z-30"
        >
          <div className="relative flex flex-col items-center w-full h-full">
            <Swiper
              className="w-full h-full"
              spaceBetween={1}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 4,
                },
              }}
            >
              {previewImages.images.map((image, index) => (
                <SwiperSlide
                  className="flex items-center justify-center w-full h-full"
                  key={index}
                >
                  <Image
                    fill
                    src={image}
                    alt="selected"
                    className="object-contain w-full h-full"
                    loading="lazy"
                  />
                  {/* works? */}
                </SwiperSlide>
              ))}
            </Swiper>
            <Close
              close={() => {
                setPreviewImages({ images: [], show: false });
                setMessage((prev) => ({ ...prev, imageContent: [] }));
              }}
              className="absolute z-40 top-4 right-4 text-primary"
            />
            <div className="absolute z-40 flex items-center gap-2 mx-2 bottom-4">
              <ReactTextareaAutoSize
                value={message.textContent}
                // cols={5}
                maxRows={5}
                onChange={(e) =>
                  setMessage((prev) => ({
                    ...prev,
                    textContent: e.target.value,
                  }))
                }
                className="relative w-full p-1 text-gray-700 border-none outline-none resize-none bg-primary/10 rounded-xl focus:outline-primary before:w-full before:h-full before:absolute before:top-0 before:left-0"
              />
              <button className="mb-2 text-3xl active:scale-90 active:opacity-40 rounded-full bg-primary p-2 flex items-center justify-center mt-[0.65rem]">
                <PaperAirplaneIcon className="w-6 h-6 fill-white" />
              </button>
            </div>
          </div>
        </AnimateInOut>
      )}
      <AnimateInOut
        init={{ opacity: 0, translateY: 80, scale: 0 }}
        animate={{ opacity: 1, translateY: 0, scale: 1 }}
        out={{ opacity: 0, translateY: 80, scale: 0 }}
        show={toggleTransferForm}
        className="absolute space-y-4 p-2 bottom-[100%] bg-white rounded-xl mx-4 md:mx-16 text-center z-40"
      >
        <p>Enter the amount You want to transfer</p>
        <input
          type="number"
          className="w-full p-3 text-3xl text-gray-700 border rounded-md outline-none resize-none bg-primary/20 border-primary_ focus:outline-primary"
        />

        <div className="flex justify-around w-full">
          <button onClick={() => setToggleTransferForm(false)}>cancel</button>{" "}
          <button>confirm</button>
        </div>
      </AnimateInOut>

      {/* REPLY MESSAGE */}
      {/* <AnimateInOut
        init={{ opacity: 0, left: 100 }}
        animate={{ opacity: 1, left: 0 }}
        out={{ opacity: 0, left: 100 }}
        show={replyMessage.length > 0}
        className={`${
          replyMessage.length > 0 && "-translate-y-full"
        } left-0 w-full bg-white p-2 absolute -top-0 text-gray-500 `}
      >
        <p className="relative p-2 px-3  rounded-md bg-primary/10 after:absolute after:left-1 after:inset-0 after:bg-primary after:h-[80%] after:w-1 after:my-auto top-full mx-auto after:rounded-full">
          {replyMessage}
        </p>
      </AnimateInOut> */}
      <form
        // TODO COMEBACK ADD_TYPES
        //@ts-ignore
        onSubmit={(e) => handleSend(e)}
        className="relative flex items-end w-full gap-2 pt-1 pb-1 mt-auto"
      >
        <div
          className={`relative bg-white rounded-xl flex items-center w-full gap-2 p-2 ${
            replyMessage.sender ? "rounded-t-none" : ""
          }`}
        >
          <AnimateInOut
            init={{ opacity: 0, left: 100 }}
            animate={{ opacity: 1, left: 0 }}
            out={{ opacity: 0, left: 100 }}
            show={replyMessage && replyMessage.sender.length > 0}
            className={`${
              replyMessage.sender.length > 0 && "-translate-y-[99%]"
            } left-0 w-full bg-white pt-2 px-2 absolute -top-0 rounded-t-xl text-gray-500 `}
          >
            <div className="relative p-1 px-3  rounded-md bg-primary/10 after:absolute after:left-1 after:inset-0 after:bg-primary after:h-[80%] after:w-1 after:my-auto top-full mx-auto after:rounded-full">
              <span
                onClick={() =>
                  setReplyMessage({
                    sender: "",
                    imageContent: [],
                    textContent: "",
                  })
                }
                className="absolute top-0 right-0 p-2 cursor-pointer active:opacity-50 active:scale-90"
              >
                <XMarkIcon className="w-5 h-5" />
              </span>
              <small className="text-xs">
                {replyMessage.sender.toString() ===
                session?.user.name?.toString()
                  ? "You"
                  : replyMessage.sender}
              </small>
              <div className="flex items-center">
                {replyMessage.textContent && (
                  <small className="font-bold">
                    {replyMessage.textContent}
                  </small>
                )}
                {replyMessage.imageContent &&
                  replyMessage.imageContent?.length > 0 && (
                    <>
                      <small className="flex items-center gap-1">
                        <PhotoIcon className="w-4 h-4 fill-gray-500" />
                        Photo
                      </small>
                      <div className="w-10 h-10 ml-auto rounded-md overflow-clip bg-primary">
                        <Image
                          src={replyMessage.imageContent[0]}
                          alt="reply img content"
                          fill
                        />
                      </div>
                    </>
                  )}
              </div>
            </div>
          </AnimateInOut>
          {/* IMAGE & FUNDS */}
          <AnimateInOut
            show={showOthers}
            init={{ width: 0, scale: 0 }}
            animate={{ width: "auto", scale: 1 }}
            out={{ width: 0, scale: 0 }}
            transition={{ type: "keyframes" }}
            className="flex items-center gap-2"
          >
            <div>
              <div
                onClick={() => setToggleTransferForm((prev) => !prev)}
                className="text-3xl cursor-pointer active:scale-90 active:opacity-40"
              >
                <WalletIcon className="w-6 h-6 fill-primary" />
              </div>
            </div>
            <div>
              <label
                htmlFor="image"
                className="text-3xl cursor-pointer active:scale-90 active:opacity-40"
              >
                <PhotoIcon className="w-6 h-6 fill-primary" />
              </label>
              <input
                // value={""}
                type="file"
                id="image"
                accept="image/*"
                hidden
                multiple
                onChange={(e: any) => {
                  const target = e.target as HTMLInputElement;

                  // @ts-ignore TODO
                  const imgs = Object.values<any>(target.files).map(
                    (image) => image
                  );

                  console.log("IMGS", imgs);
                  readURI(imgs);
                  //TODO COMEBACK ADD_TYPES
                  //@ts-ignore
                  return setMessage((prev) => ({
                    ...prev,
                    imageContent: [target.value],
                  }));
                }}
              />
            </div>
          </AnimateInOut>
          {/* <div className="relative z-10 flex items-end flex-1 transition-all duration-500 rounded-xl bg-primary/10_"> */}

          {/* MESSAGE INPUT */}
          <ReactTextareaAutoSize
            value={message.textContent}
            // cols={5}
            maxRows={5}
            onChange={(e) =>
              setMessage((prev) => ({
                ...prev,
                textContent: e.target.value,
              }))
            }
            className="w-full text-gray-700 bg-transparent border-none outline-none resize-none rounded-xl"
          />
          {/* </div> */}
        </div>
        <button className="mb-2 text-3xl active:scale-90 active:opacity-40">
          <PaperAirplaneIcon className="w-8 h-8 translate-y-1 fill-primary" />
        </button>
      </form>
    </div>
  );
}
