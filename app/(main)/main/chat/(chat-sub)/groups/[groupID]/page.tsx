// @ts-nocheck
"use client";

import { useState } from "react";
import { Header } from "@/components/shared";
import { Messages, SendMessage } from "../../../components";
import { SendMessageType } from "@/app/chat/components/SendMessage/types";

export default function Group({ params }: { params: { groupID: string } }) {
  const [replyMessage, setReplyMessage] = useState<
    SendMessageType["replyMessage"]
  >({ sender: "", imageContent: [], textContent: "" });
  const [inputRef, setInputRef] = useState<React.MutableRefObject<undefined>>();

  return (
    <main className="flex flex-col w-full h-screen bg-primary/10">
      <Header title="Group" imgShown />
      <Messages
        chatID={params.groupID}
        roomType="group"
        setReplyMessage={setReplyMessage}
        inputRef={inputRef}
      />
      <SendMessage
        replyMessage={replyMessage}
        setReplyMessage={setReplyMessage}
        chatID={params.groupID}
        roomType="group"
        getInputRef={setInputRef}
      />
    </main>
  );
}
