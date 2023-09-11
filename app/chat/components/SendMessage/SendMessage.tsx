"use client"

import React, {
  ChangeEvent,
  FormHTMLAttributes,
  useContext,
  useEffect,
  useState,
} from "react";
import { PaperAirplaneIcon, PhotoIcon} from "@heroicons/react/20/solid";
import { SendMessageType } from "./types";
import { AnimateInOut } from "@/components";
import {  ChatContext } from "@/context";
import ReactTextareaAutoSize from "react-textarea-autosize";

export default function SendMessage({
  replyMessage,
  setReplyMessage,
}: SendMessageType) {
  const [chatId, setChatId] = useState("");

  const { getChatId } = useContext(ChatContext);

  const [image, setImage] = useState<Blob | Uint8Array | ArrayBuffer | null>(
    null
  );
  const [text, setText] = useState("");

  useEffect(() => {
    (async () => {
      setChatId(await getChatId());
    })();
  }, []);

  // TODO COMEBACK

  const resetInput = () => {
    setText("");
    setReplyMessage("");
    setImage(null);
  };

  const handleSend = async (e: SubmitEvent) => {
    e.preventDefault();
   
    resetInput();

  
  };

  return (
    <div
      className="relative w-full "
    >
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
            value={text}
            // cols={5}
            maxRows={5}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-1 text-gray-700 bg-transparent border-none rounded-md outline-none resize-none focus:outline-primary"
          />
          <label
            htmlFor="image"
            className="text-3xl cursor-pointer active:scale-90 active:opacity-40"
          >
            <PhotoIcon className="fill-primary" />
          </label>
          <input
            // value={""}
            type="file"
            id="image"
            hidden
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              //TODO COMEBACK ADD_TYPES
              //@ts-ignore
              setImage(e.target.value)
            }
          />
        </div>
        <button className="mb-2 text-3xl active:scale-90 active:opacity-40">
          <PaperAirplaneIcon className="fill-primary" />
        </button>
      </form>
    </div>
  );
}
