// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components";
import { Messages, SendMessage } from "../../../components";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";

export default function Chat({ params }: { params: { chatID: string } }) {
  const [replyMessage, setReplyMessage] = useState<{
    sender: string;
    textContent?: string;
    imageContent?: string[];
  }>({ sender: "", textContent: "", imageContent: [] });

  return (
    <>
      <Header
        title={"Username"}
        leading={[
          <button
            key={Math.random()}
            className="p-3 text-gray-700 transition-all duration-200 rounded-full hover:bg-gray-400/40 active:animate-ping"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>,
        ]}
      />
      <main className="flex flex-col w-full h-[calc(100vh-3.5rem)] bg-primary/10">
        <Messages
          chatID={params.chatID}
          setReplyMessage={setReplyMessage}
          roomType="p2p"
        />
        <SendMessage
          replyMessage={replyMessage}
          setReplyMessage={setReplyMessage}
          chatID={params.chatID}
          roomType="p2p"
        />
      </main>
    </>
  );
}
