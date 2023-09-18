"use client"

import { useState } from "react";
import { Header } from "@/components";
import { Messages, SendMessage } from "../../../components";

export default function Group({params}:{params:{groupID:string}}) {
  const [replyMessage, setReplyMessage] = useState("");

  return (
    <main className="flex flex-col w-screen h-screen bg-primary/50">
      <Header title="chats" imgShown />
      <Messages chatID={params.groupID} setReplyMessage={setReplyMessage} />
      <SendMessage
        replyMessage={replyMessage}
        setReplyMessage={setReplyMessage}
        chatID={params.groupID}
        roomType="group"      />
    </main>
  );
}
