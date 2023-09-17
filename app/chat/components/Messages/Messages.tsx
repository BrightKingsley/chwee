import Message from "../Message";
import { MessageClass } from "@/models/Message";
import poor from "@/assets/images/poor.png";
import nft from "@/assets/images/nft.jpg";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "@/context";
import { useParams } from "next/navigation";
import { pusherClient } from "@/lib/config";
import {URL} from "@/constants/routes"
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import LoadingMessages from "../LoadingMessages"
// const messages: MessageModel[] = [];

// for (let i = 0; i < 10; i++) {
// app/api/route.ts//   messages.push({
//     id: `msgID${i}chkDSk`,
//     photoURL: nft,
//     name: `my Name - ${i}`,
//     text: `I dont trust anybody - ${i}`,
//     image: poor,
//     senderId: `userID${i}chkDSk`,
//     createdAt: new Date(),
//   });
// }

const getMessages = async () => {
  await fetch(`${URL}/api/`);
};

//TODO typecheck
export default function Messages({ setReplyMessage }: any) {
  const [messages, setMessages] = useState<MessageClass[] | null>(null);
  const [loading, setLoading] = useState(false)



  const { data } = useSession();
  const session: Session | any = data;
  const params = useParams();

  const chatID = params.chatID as string;

  console.log("PARAMS =>", params, chatID);

  useEffect(() => {
    if (!chatID) return;
    pusherClient.subscribe(chatID);

    pusherClient.bind("incoming-message", (message: MessageClass) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => pusherClient.unsubscribe(chatID);
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true)
      const response = await fetch(
        `${URL}/api/messaging/${chatID}`,
        { cache: "no-cache" }
      );


      const {messages} = await response.json();

      console.log("RESPONSE =>", response,"MSGS", messages)

      if(!messages)return

      setMessages(messages);
      setLoading(false)
    })();
  }, [chatID]);

  return  (
    <div className="flex flex-col flex-1 m-2 space-y-2 overflow-y-auto ">

      { loading || !session || !session.user.id ? <LoadingMessages/> : messages.map(
        ({ id, imageContent, textContent, sendDate, sender }, i) => (
          <Message
            key={i}
            id={id}
            // photoURL={photoURL}
            imageContent={imageContent}
            // name={name}
            textContent={textContent}
            sendDate={sendDate}
            sender={sender}
            userID={session.user.id}
            setReplyMessage={setReplyMessage}
          />
        )
      )}
    </div>
  ) 
  // : (
  //   <div className="flex items-center justify-center w-full h-full">
  //     <h1>No Messages Available</h1>
  //   </div>
  // );
}
