"use client";

import React, {
  ChangeEvent,
  FormHTMLAttributes,
  useContext,
  useEffect,
  useState,
} from "react";
import { PaperAirplaneIcon, PhotoIcon ,WalletIcon} from "@heroicons/react/20/solid";
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

  const [showOthers, setShowOthers]=useState(true) 
  const [toggleTransferForm, setToggleTransferForm] = useState(false)

  useEffect(()=>{
    console.log("CHECK_SESSION",session)
setMessage(prev=>({...prev,sender:session?.user.id}))
  },[session])

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

  useEffect(()=>{
    console.log(message.textContent.length)
return message.textContent ? setShowOthers(false) : setShowOthers(true); 
  },[message.textContent])

  return (
    <div className="relative w-full">
      <AnimateInOut
        init={{ opacity: 0, translateY: 200, scale:0 }}
        animate={{ opacity: 1, translateY: 0, scale:1 }}
        out={{ opacity: 0, translateY: 200, scale:0 }}
        show={toggleTransferForm}
        className="space-y-4 p-2 -top-[10%] bg-white rounded-xl mx-16 text-center z-50"
      >
        <p>Enter the amount You want to transfer</p>
        <input type="number" className="text-gray-700 p-3 text-3xl bg-primary/20 border border-primary_ rounded-md outline-none resize-none focus:outline-primary w-full" />

<div className="flex w-full justify-around">
        <button onClick={()=>setToggleTransferForm(false)}>cancel</button> <button>confirm</button></div>
      </AnimateInOut>
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
        className="flex items-center w-full gap-2 p-2 mt-auto bg-white"
      >
         <AnimateInOut show={showOthers}
         init={{width:0, opacity:0}}
animate={{width:"auto", opacity:1}}
out={{width:0, opacity:0}}

         className="flex items-center gap-2">
        <div>
        <div
        onClick={()=>setToggleTransferForm(prev=>!prev)}
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
          </AnimateInOut>
        <div className="relative z-10 flex items-end flex-1 gap-2 rounded-md transition-all duration-500 _items-center bg-primary/10">
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
          
        </div>
        <button className="mb-2 text-3xl active:scale-90 active:opacity-40">
          <PaperAirplaneIcon className="w-8 h-8 -bottom-2 fill-primary" />
        </button>
      </form>
    </div>
  );
}
