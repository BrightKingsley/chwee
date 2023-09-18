"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components";
import { Messages, SendMessage } from "../../../components";

export default function Chat({ params }: { params: { chatID: string } }) {
  const [replyMessage, setReplyMessage] = useState("");

  return (
    <main className="flex flex-col w-screen h-screen bg-primary/50">
      <Messages chatID={params.chatID} setReplyMessage={setReplyMessage} />
      <SendMessage
        replyMessage={replyMessage}
        setReplyMessage={setReplyMessage}
        chatID={params.chatID}
        roomType="p2p"
      />
    </main>
  );
}
