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

import AccountBalanceWalletOutlined from "@mui/icons-material/AccountBalanceWalletOutlined";
import AddPhotoAlternateOutlined from "@mui/icons-material/AddPhotoAlternateOutlined";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";

import { PhotoIcon, XMarkIcon } from "@heroicons/react/20/solid";

import { Swiper, SwiperSlide } from "swiper/react";

import { SendMessageType } from "./types";
import { AnimateInOut, Close } from "@/components/shared";
import { ChatContext } from "@/context";
import { useParams } from "next/navigation";
import { MessageClass } from "@/models/Message";
import { BASE_URL } from "@/constants/routes";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useUploadThing } from "@/lib/uploadThing";
import { SendFunds, UploadImageData } from "..";
import { IconButton, TextareaAutosize } from "@mui/material";

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

  const uploadThing = useUploadThing("imageUploader", {});

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
  }, [session, session?.user, message.textContent, message.imageContent]);

  const sendMessage = async (
    images?: MessageBody["imageContent"] = message.imageContent
  ) => {
    let messageData = { ...message };
    if (images.length > 0) {
      messageData.sender = message.sender;
      messageData.imageContent = images;
    }
    try {
      console.log("SENDING_MESSAGE ==>", { messageData, message });
      const res = await fetch(`${BASE_URL}/api/messaging/${chatID}`, {
        method: "POST",
        body: JSON.stringify({ message: messageData, roomType }),
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

  return (
    <div className="relative w-full">
      {previewImages.images.length > 0 && previewImages.show && (
        // NOTE Upload Image Data component
        <UploadImageData
          message={message}
          previewImages={previewImages}
          setMessage={setMessage}
          setPreviewImages={setPreviewImages}
          sendMessage={sendMessage}
        />
      )}
      <SendFunds
        setToggleTransferForm={setToggleTransferForm}
        toggleTransferForm={toggleTransferForm}
      />
      <form
        // TODO COMEBACK ADD_TYPES
        //@ts-ignore
        onSubmit={(e) => handleSend(e)}
        className="relative flex items-end w-full max-w-md gap-2 pt-1 pb-1 mx-auto mt-auto px-2"
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
              <div className="absolute top-0 right-0">
                <IconButton
                  onClick={() =>
                    setReplyMessage({
                      sender: "",
                      imageContent: [],
                      textContent: "",
                    })
                  }
                  className="p-2 cursor-pointer active:opacity-50 active:scale-90"
                >
                  <XMarkIcon className="w-5 h-5" />
                </IconButton>
              </div>
              <small className="text-xs">
                {replyMessage.sender.toString() ===
                session?.user.name?.toString()
                  ? "You"
                  : replyMessage.sender}
              </small>
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
                      <div className="ml-auto rounded-md w-14 h-14 overflow-clip bg-primary">
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
            className="flex items-center -space-x-2"
          >
            <IconButton
              title="send funds"
              aria-label="send funds"
              onClick={() => setToggleTransferForm((prev) => !prev)}
              className="flex items-center justify-center text-3xl cursor-pointer active:scale-90 active:opacity-40"
            >
              <LocalAtmOutlinedIcon className="w-6 h-6 fill-primary" />
            </IconButton>
            <IconButton title="attach image">
              <label
                htmlFor="image"
                className="flex items-center justify-center text-3xl cursor-pointer active:scale-90 active:opacity-40"
              >
                <AddPhotoAlternateOutlined className="w-6 h-6 fill-primary" />
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
            </IconButton>
          </AnimateInOut>
          {/* <div className="relative z-10 flex items-end flex-1 transition-all duration-500 rounded-xl bg-primary/10_"> */}

          {/* MESSAGE INPUT */}
          <TextareaAutosize
            title="enter text"
            aria-label="enter message text"
            value={message.textContent}
            // cols={5}
            maxRows={5}
            onChange={(e) =>
              setMessage((prev) => ({
                ...prev,
                textContent: e.target.value,
              }))
            }
            className="w-full py-2 text-gray-700 bg-transparent border-none outline-none resize-none rounded-xl"
          />
          {/* </div> */}
        </div>
        <IconButton
          type="submit"
          title="send message"
          aria-label="send message"
          className="flex items-center justify-center bg-body stroke-primary"
        >
          {/* <Send className="w-8 h-8 " /> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            // stroke="currentColor"
            strokeWidth={2}
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </IconButton>
      </form>
    </div>
  );
}
