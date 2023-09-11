"use client"

import { useState } from "react";
import { Header } from "@/components";
import { Messages, SendMessage } from "../../components";

export default function Group({params}:{params:{groupID:string}}) {
  const [replyMessage, setReplyMessage] = useState("");

  return (
    <main className="w-screen h-screen bg-primary/50 flex flex-col">
      <Header title="chats" imgShown />
      <Messages setReplyMessage={setReplyMessage} />
      <SendMessage
        replyMessage={replyMessage}
        setReplyMessage={setReplyMessage}
      />
    </main>
  );
}
