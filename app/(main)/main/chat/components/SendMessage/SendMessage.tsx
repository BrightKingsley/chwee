"use client";
import React, { Ref, useContext, useEffect, useRef, useState } from "react";

import ImageLineIcon from "remixicon-react/ImageLineIcon";
import SendPlane2LineIcon from "remixicon-react/SendPlane2LineIcon";

import {
  ChevronRightIcon,
  PhotoIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";

import { SendMessageType } from "./types";
import { AnimateInOut, UserListModal } from "@/app/components/client";
import { ChatContext, NotificationContext } from "@/context";
import { BASE_URL } from "@/constants/routes";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import Image from "next/image";
import { TransactionForm, UploadImageData } from "..";
import TextareaAutosize from "react-textarea-autosize";
import { useImageUpload } from "@/hooks";
import { Button, Card, IconButton, Spinner } from "@/app/components/mui";
import { ClientUser, MessageBody } from "@/types/models";
import ExchangeDollarLineIcon from "remixicon-react/ExchangeDollarLineIcon";
import HandCoinLineIcon from "remixicon-react/HandCoinLineIcon";
import CoinsLineIcon from "remixicon-react/CoinsLineIcon";
import { useRouter } from "next/navigation";
// import {
//   CoinsOutlined,
//   ExchangeDollarOutlined,
//   HandCoinOutlined,
// } from "@/app/components/Icons";

export default function SendMessage({ chatID, roomType }: SendMessageType) {
  const { data } = useSession();
  const session: Session | null = data;

  const { triggerNotification } = useContext(NotificationContext);
  const {
    setToggleTransactionForm,
    replyMessage,
    setReplyMessage,
    sendMessage,
    resetInput,
    loading,
    message,
    setLoading,
    setMessage,
    membersModal,
    setMembersModal,
    selectedImages,
    setSelectedImages,
    readURI,
    previewImages,
    setInputRef,
  } = useContext(ChatContext);

  const inputRef = useRef<HTMLTextAreaElement>();

  const [showActionIcons, setShowActionIcons] = useState(true);
  const [toggleFunds, setToggleFunds] = useState(false);

  const { getInputProps, getRootProps, startUpload } = useImageUpload({
    endpoint: "chatImageUploader",
    setImg: setSelectedImages,
    onClientUploadComplete(files) {
      console.log("FILES: ", files);

      const imageContent = files?.map((file) => file.url);

      console.log("IMAGE_CONTENT", imageContent);
      setMessage((prev) => ({
        ...prev,
        imageContent: imageContent as string[],
      }));
      const messageToSend: MessageBody = {
        ...message,
        sendDate: new Date(),
      };
      sendMessage({
        message: messageToSend,
        chatID,
        roomType,
        images: imageContent,
      });
    },
  });

  const resetFunds = () => {
    setMembersModal((prev) => ({ ...prev, value: "" }));
  };

  const handleSend = async (e: SubmitEvent) => {
    try {
      e.preventDefault();

      if (
        !message.textContent &&
        message.imageContent.length < 1 &&
        !(message.transaction && message.transaction.amount)
      )
        return triggerNotification("Invalid message data");

      if (selectedImages.length > 0) return startUpload(selectedImages);
      const messageToSend: MessageBody = {
        ...message,
        sendDate: new Date(),
      };

      await sendMessage({
        message: messageToSend,
        chatID,
        roomType,
      });
    } catch (error) {
      console.error({ error });
      setLoading(false);
      resetInput();
    }
  };

  const getMembers = async () => {
    try {
      setMembersModal((prev) => ({ ...prev, loading: true, show: true }));
      console.log({ chatID });
      const res = await fetch(`${BASE_URL}/api/groups/${chatID}/members`);
      const data = await res.json();
      console.log({ data });
      const members = data as ClientUser[] | null;
      if (!members)
        return setMembersModal((prev) => ({
          ...prev,
          loading: false,
        }));
      return setMembersModal((prev) => ({
        ...prev,
        loading: false,
        members,
      }));
    } catch (error) {
      console.error({ error });
      setMembersModal((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleShowMembers = () => {
    setMembersModal((prev) => ({ ...prev, show: false }));
  };
  const handleMemberClicked = (tag: string) => {
    setMembersModal((prev) => ({ ...prev, value: tag }));
  };

  useEffect(() => {
    setInputRef(inputRef);
  }, []);

  useEffect(() => {
    if (membersModal.value.length > 0) {
      setMembersModal((prev) => ({ ...prev, show: false }));
      setMessage((prev) => ({
        ...prev,
        transaction: {
          ...prev.transaction,
          receiver: membersModal.value,
          type: "send",
        },
      }));
      setToggleTransactionForm({ show: true, type: "send" });
    }
  }, [membersModal.value]);

  useEffect(() => {
    setMessage((prev) => ({ ...prev, replyTo: replyMessage }));
  }, [replyMessage]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log("CHECK_SESSION", session);
      // TODO check this(!)
      setMessage((prev) => ({ ...prev, sender: session?.user.id! }));
    }, 2000);

    return () => clearTimeout(timeout);
  }, [session, session?.user, message.textContent, message.imageContent]);

  return (
    <>
      <div className="relative w-full">
        <AnimateInOut
          init={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          out={{ opacity: 0 }}
          show={loading}
          className="fixed h-[calc(100vh-3.5rem)]_ w-[calc(100vw-3.5rem)]_ w-full bottom-4 bg-white/20 top-14_ right-0 z-50 flex items-center justify-center backdrop-blur_-sm h-fit"
        >
          <Spinner className="w-6 h-6" />
        </AnimateInOut>

        {previewImages.images.length > 0 && previewImages.show && (
          // NOTE Upload Image Data component
          <UploadImageData startUpload={startUpload} />
        )}

        <TransactionForm />

        <form
          // TODO COMEBACK ADD_TYPES
          //@ts-ignore
          onSubmit={(e) => handleSend(e)}
          className="relative flex items-end w-full max-w-md gap-2 px-2 pt-1 pb-1 mx-auto mt-auto"
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
              <div className="relative p-1_ pl-3  rounded-md min-h-[3.5rem] bg-primary/10 after:absolute after:left-1 after:inset-0 after:bg-primary after:h-[80%] after:w-1 after:my-auto top-full mx-auto after:rounded-full flex">
                <div className="absolute top-0 right-0 z-10 w-fit">
                  <IconButton
                    color="white"
                    variant="filled"
                    onClick={() =>
                      setReplyMessage({
                        sender: "",
                        imageContent: [],
                        textContent: "",
                      })
                    }
                    className="w-5 h-5 !p-0 bg-white text-gray-700 !shadow-none rounded-full"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </IconButton>
                </div>
                <div className="flex flex-col justify-center gap-1">
                  <small className="text-xs text-primary">
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
                        <small className="flex items-center gap-1">
                          <PhotoIcon className="w-4 h-4 fill-gray-500" />
                          Photo
                        </small>
                      )}
                  </div>
                </div>
                <div className="ml-auto">
                  {replyMessage.imageContent &&
                    replyMessage.imageContent?.length > 0 && (
                      <>
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
              show={showActionIcons}
              init={{ width: 0, scale: 0 }}
              animate={{ width: "auto", scale: 1 }}
              out={{ width: 0, scale: 0 }}
              transition={{ type: "keyframes" }}
              className="flex items-center self-end -space-x-2 shrink-0 relative_"
            >
              <IconButton
                title="transaction"
                aria-label="transaction"
                onClick={() => {
                  setToggleFunds((prev) => !prev);
                }}
                className="flex items-center justify-center text-3xl rounded-full fill-primary"
              >
                <ExchangeDollarLineIcon className="w-6 h-6 fill-primary" />
              </IconButton>

              <IconButton title="attach image" className="rounded-full">
                <label
                  htmlFor="image"
                  className="flex items-center justify-center text-3xl rounded-full cursor-pointer active:scale-90 active:opacity-40"
                >
                  <ImageLineIcon className="w-6 h-6 fill-primary" />
                </label>
                <input
                  // value={""}
                  {...getInputProps()}
                  type="file"
                  id="image"
                  accept="image/*"
                  hidden
                  multiple
                  onInput={(e: any) => {
                    const target = e.target as HTMLInputElement;

                    // @ts-ignore TODO
                    const imgs = Object.values<any>(target.files).map(
                      (image) => image
                    );

                    console.log("IMGS", imgs, { files: target.files });
                    readURI(imgs);
                  }}
                />
              </IconButton>
            </AnimateInOut>

            <AnimateInOut
              show={toggleFunds}
              init={{ opacity: 0, scale: 0, translateY: 80 }}
              animate={{
                opacity: 1,
                // bottom: "calc(calc(100% + 1.5rem) * -1)",
                // left: "0.5rem",
                translateY: 0,
                scale: 1,
              }}
              out={{ opacity: 0, scale: 0, translateY: 80 }}
              className="absolute left-0 flex_ items-center_ w-full mx-auto rounded-md bottom-16 h-fit"
            >
              {/* <div className="relative flex items-center w-full h-full gap-3 p-2 justify-evenly"> */}
              <Card
                title="request for funds"
                aria-label="request for funds"
                className="shadow-primary/20  flex-1 w-full active:scale-95 transition-all !p-0 duration-150"
              >
                <Button
                  onClick={() => {
                    return setToggleTransactionForm((prev) => ({
                      ...prev,
                      show: true,
                      type: "request",
                    }));
                  }}
                  variant="filled"
                  color="white"
                  className="space-y-2 h-full  p-2 flex-1 w-full flex !flex-col items-center"
                >
                  <HandCoinLineIcon className="w-16 h-16 fill-primary" />
                  <small className="!text-gray-700">request for funds</small>
                </Button>
              </Card>
              <Card
                title="send funds"
                aria-label="send funds"
                className="shadow-primary/20 relative  flex-1 w-full active:scale-95 transition-all !p-0 duration-150"
              >
                <Button
                  onClick={() => {
                    if (roomType === "p2p")
                      return setToggleTransactionForm((prev) => ({
                        ...prev,
                        show: true,
                        type: "send",
                      }));
                    getMembers();
                  }}
                  variant="filled"
                  color="white"
                  className="space-y-2 h-full  p-2 flex-1 w-full flex !flex-col items-center"
                >
                  <CoinsLineIcon className="w-16 h-16 fill-primary" />
                  <small className="!text-gray-700">send funds</small>
                </Button>
              </Card>
              {/* <div className="absolute -right-6 w-fit h-fit -top-6">
                  <IconButton
                    onClick={() => {
                      setToggleFunds(false);
                    }}
                    variant="filled"
                    color="white"
                    className="rounded-full"
                  >
                    <XMarkIcon className="w-8 h-8 text-gray-700 fill-gray-700" />
                  </IconButton>
                </div> */}
              {/* </div> */}
            </AnimateInOut>

            {!showActionIcons && (
              <IconButton
                onClick={() => setShowActionIcons(true)}
                className="self-end rounded-full shrink-0"
              >
                <ChevronRightIcon className="w-6 h-6 fill-primary text-primary" />
              </IconButton>
            )}

            {/* MESSAGE INPUT */}
            <TextareaAutosize
              ref={inputRef as Ref<HTMLTextAreaElement>}
              title="enter text"
              placeholder="Send a message..."
              aria-label="enter message text"
              value={message.textContent}
              onFocus={() => {
                setShowActionIcons(false);
                setToggleFunds(false);
              }}
              onBlur={() => {
                setShowActionIcons(true);
              }}
              maxRows={5}
              onChange={(e) =>
                setMessage((prev) => ({
                  ...prev,
                  textContent: e.target.value,
                }))
              }
              className="w-full py-2 text-gray-700 bg-transparent border-none outline-none resize-none"
            />
            {/* </div> */}
          </div>
          <IconButton
            variant="filled"
            type="submit"
            title="send message"
            aria-label="send message"
            className="flex items-center justify-center p-2 rounded-full shrink-0 bg-body fill-primary text-primary"
          >
            {/* <Send className="w-8 h-8 " /> */}
            {/* <svg
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
            </svg> */}
            <SendPlane2LineIcon className="w-8 h-8 p-1" />
          </IconButton>
        </form>
      </div>
      <UserListModal
        loading={membersModal.loading}
        show={membersModal.show}
        userList={membersModal.members}
        handleItemClicked={handleMemberClicked}
        handleShowModal={handleShowMembers}
        overlay
      />
    </>
  );
}
