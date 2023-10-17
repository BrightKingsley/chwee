// @ts-nocheck
"use client";
import Message from "../Message";
import { MessageClass } from "@/models/Message";
import poor from "@/assets/images/poor.png";
import nft from "@/assets/images/nft.jpg";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "@/context";
import { useParams } from "next/navigation";
import { pusherClient } from "@/lib/config";
import { BASE_URL } from "@/constants/routes";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import LoadingMessages from "../LoadingMessages";
import LocalHotelOutlinedIcon from "@mui/icons-material/LocalHotelOutlined";
//TODO typecheck
export default function Messages({
  setReplyMessage,
  chatID,
  roomType,
  inputRef,
  getViewImages,
}: any) {
  const [messages, setMessages] = useState<MessageClass[]>([]);
  const [loading, setLoading] = useState(false);

  // password: b3xF2yRB | q7b5KYV6 | V6XBvBjX

  const { data } = useSession();
  const session: Session | any = data;
  const params = useParams();

  useEffect(() => {
    if (!chatID) return;
    pusherClient.subscribe(chatID);
    pusherClient.bind("incoming-message", (message: MessageClass) => {
      setMessages((prev) => [...prev, message]);
    });
    return () => pusherClient.unsubscribe(chatID);
  }, []);

  useEffect(() => {
    setLoading(true);
    (async () => {
      //TODO remove hard-coded password
      const response = await fetch(
        `${BASE_URL}/api/messaging/${chatID}?roomType=${roomType}&password=V6XBvBjX`,
        {
          cache: "no-cache",
        }
      );

      if (!response.ok) return setLoading(false);

      const data = await response.json();
      console.log({ data });
      if (!data) return setLoading(false);

      const { messages: msgs } = data;
      console.log("CLIENT MSGS", msgs);

      if (!msgs) return;

      setMessages(msgs);
      setLoading(false);
    })();
  }, [chatID]);

  return (
    <div className="flex flex-col flex-1 pt-1 mx-2 space-y-2 overflow-y-auto">
      {loading ? (
        <LoadingMessages />
      ) : messages.length < 1 || !session || !session.user.id ? (
        <div className="flex items-center justify-center w-full h-full">
          <p className="font-bold">
            no messages available{" "}
            <LocalHotelOutlinedIcon className="w-6 h-6 text-brand-lightblue" />{" "}
          </p>
        </div>
      ) : (
        messages.map(({ id, ...message }, i) => (
          <Message
            key={i}
            id={id}
            message={message}
            roomType={roomType}
            userID={session.user.id}
            setReplyMessage={setReplyMessage}
            inputRef={inputRef}
            getViewImages={getViewImages}
          />
        ))
      )}
    </div>
  );
  // : (
  //   <div className="flex items-center justify-center w-full h-full">
  //     <h1>No Messages Available</h1>
  //   </div>
  // );
}
