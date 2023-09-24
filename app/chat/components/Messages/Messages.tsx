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
// const messages: MessageModel[] = [];

// for (let i = 0; i < 10; i++) {
// app/api/route.ts//   messages.push({
//     id: `msgID${i}chkDSk`,
//     photo: nft,
//     name: `my Name - ${i}`,
//     text: `I dont trust anybody - ${i}`,
//     image: poor,
//     senderId: `userID${i}chkDSk`,
//     createdAt: new Date(),
//   });
// }

//TODO typecheck
export default function Messages({ setReplyMessage, chatID, roomType }: any) {
  const [messages, setMessages] = useState<MessageClass[]>([]);
  const [loading, setLoading] = useState(false);

  // password: b3xF2yRB | q7b5KYV6 | V6XBvBjX

  const { data } = useSession();
  const session: Session | any = data;
  const params = useParams();

  useEffect(() => {
    // if (!chatID) return;
    // pusherClient.subscribe(chatID);
    // pusherClient.bind("incoming-message", (message: MessageClass) => {
    //   setMessages((prev) => [...prev, message]);
    // });
    // return () => pusherClient.unsubscribe(chatID);
  }, []);

  useEffect(() => {
    setLoading(true);
    (async () => {
      //TODO remove hard-coded password
      const response = await fetch(
        `${BASE_URL}/api/messaging/${chatID}?password=V6XBvBjX`,
        {
          cache: "no-cache",
        }
      );

      console.log("FIRST_RES", response);

      if (!response.ok) {
        setLoading(false);
        return;
      }

      const data = await response.json();
      if (!data) return;

      const { messages: msgs } = data;

      if (!msgs) return;

      setMessages(msgs);
      setLoading(false);
    })();
  }, [chatID]);

  return (
    <div className="flex flex-col flex-1 mx-2 space-y-2 overflow-y-auto">
      {loading ? (
        <LoadingMessages />
      ) : messages.length < 1 || !session || !session.user.id ? (
        <div className="w-full h-full flex items-center justify-center">
          <h1>NO MESSAGES AVAILABLE</h1>
        </div>
      ) : (
        messages.map(({ id, ...message }, i) => (
          <Message
            key={i}
            id={id}
            message={message}
            roomType={roomType}
            // photo={photo}
            // imageContent={imageContent}
            // // name={name}
            // textContent={textContent}
            // sendDate={sendDate}
            // sender={sender}
            userID={session.user.id}
            setReplyMessage={setReplyMessage}
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
