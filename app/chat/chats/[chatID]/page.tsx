"use client"

import { useState } from "react";
import { Header } from "@/components";
import { Messages, SendMessage } from "../../components";

export default function Chat({params}:{params:{groupID:string}}) {
  const [replyMessage, setReplyMessage] = useState("");

  console.log(params.groupID)


  return (
    <>
    <Header imgShown={false} title={params.groupID} />
    <main className="w-screen h-screen bg-primary/50 flex flex-col">
      <Messages setReplyMessage={setReplyMessage} />
      <SendMessage
        replyMessage={replyMessage}
        setReplyMessage={setReplyMessage}
      />
    </main>
    </>
  );
}
