"use client";

import { Messages, SendMessage } from "../../../components";

export default function P2pChat({
  params,
  userID,
}: {
  params: { chatID: string };
  userID: string;
}) {
  return (
    <main className="flex flex-col w-full h-[calc(100vh-3.5rem)] bg-primary/10">
      <Messages userID={userID} chatID={params.chatID} roomType="p2p" />
      {/* <SendMessage chatID={params.chatID} roomType="p2p" /> */}
      <SendMessage roomType="p2p" />
    </main>
  );
}
