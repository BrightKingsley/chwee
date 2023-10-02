// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/shared";
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
      <Header title={"Username"} />
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
