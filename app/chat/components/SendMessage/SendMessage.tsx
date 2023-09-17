"use client";

import React, {
  ChangeEvent,
  FormHTMLAttributes,
  useContext,
  useEffect,
  useState,
} from "react";
import { PaperAirplaneIcon, PhotoIcon } from "@heroicons/react/20/solid";
import { SendMessageType } from "./types";
import { AnimateInOut } from "@/components";
import { ChatContext } from "@/context";
import ReactTextareaAutoSize from "react-textarea-autosize";
import { useParams } from "next/navigation";
import { MessageClass } from "@/models/Message";
import { URL } from "@/constants/routes";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

type MessageBody = {
  textContent: string;
  sendDate: Date;
  sender: string;
  imageContent: (Blob | Uint8Array | ArrayBuffer)[];
};

export default function SendMessage({
  replyMessage,
  setReplyMessage,
}: SendMessageType) {
  const params = useParams();

  const chatID = params.chatID as string;

  const { data } = useSession();
  const session: Session | any = data;


  const [message, setMessage] = useState<MessageBody>({
    textContent: "",
    imageContent: [],
    sendDate: new Date(),
    sender: session?.user.id,
  });

  useEffect(()=>{
    console.log("CHECK_SESSION",session)
setMessage(prev=>({...prev,sender:session?.user.id}))
  },[session])

  console.log("SENDER_ID", message.sender)

  // TODO COMEBACK

  const resetInput = () => {
    setMessage((prev) => ({ ...prev, textContent: "" }));
    setReplyMessage("");
  };

  const sendMessage = async () => {
    console.log("SENDER_ID", message.sender)
    await fetch(`${URL}/api/messaging/${chatID}`, {
      method: "POST",
      body: JSON.stringify({message, roomType:"p2p"}),
    });
  };

  const handleSend = async (e: SubmitEvent) => {
    e.preventDefault();

    if (!message) return;

    await sendMessage();

    resetInput();
  };

  return (
    <div className="relative w-full ">
      <AnimateInOut
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
      </AnimateInOut>
      <form
        // TODO COMEBACK ADD_TYPES
        //@ts-ignore
        onSubmit={(e) => handleSend(e)}
        className="flex items-end w-full gap-2 p-2 mt-auto bg-white"
      >
        <div className="flex items-end flex-1 gap-2 p-2 rounded-md _items-center bg-primary/10">
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
            className="w-full p-1 text-gray-700 bg-transparent border-none rounded-md outline-none resize-none focus:outline-primary"
          />
          <label
            htmlFor="image"
            className="text-3xl cursor-pointer active:scale-90 active:opacity-40"
          >
            <PhotoIcon className="w-10 h-10 fill-primary" />
          </label>
          <input
            // value={""}
            type="file"
            id="image"
            hidden
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              //TODO COMEBACK ADD_TYPES
              //@ts-ignore
              setMessage((prev) => ({
                ...prev,
                imageContent: [e.target.value],
              }))
            }
          />
        </div>
        <button className="mb-2 text-3xl active:scale-90 active:opacity-40">
          <PaperAirplaneIcon className="w-10 h-10 fill-primary" />
        </button>
      </form>
    </div>
  );
}
