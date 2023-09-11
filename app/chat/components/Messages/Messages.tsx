import Message from "../Message";
import { MessagesType } from "./types";
import poor from "@/assets/images/poor.png";
import nft from "@/assets/images/nft.jpg";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "@/context";

// const messages: MessageModel[] = [];

// for (let i = 0; i < 10; i++) {
//   messages.push({
//     id: `msgID${i}chkDSk`,
//     photoURL: nft,
//     name: `my Name - ${i}`,
//     text: `I dont trust anybody - ${i}`,
//     image: poor,
//     senderId: `userID${i}chkDSk`,
//     createdAt: new Date(),
//   });
// }

  //TODO typecheck
export default function Messages({ setReplyMessage }: any) {
  const [messages, setMessages] = useState<any[] | []>([]);
  const [chatId, setChatId] = useState("");

  const { getChatId } = useContext(ChatContext);

  useEffect(() => {
    (async () => {
      setChatId(await getChatId());
    })();
  }, []);

  useEffect(() => {
    // if (chatId) {
    //   const unsub = onSnapshot(doc(db, "chats", chatId), (doc) => {
    //   console.log("CHATS==>",doc.data(),doc.data().messages )
    //     doc.exists() && doc.data().messages && setMessages(doc.data().messages);
    //   });

    //   return () => {
    //     unsub();
    //   };
    // } else return;
  }, [chatId]);

  return (
    <div className="flex flex-col flex-1 space-y-2 overflow-y-auto m-2 ">
      {messages.map(
        ({ id, photoURL, image, name, text, createdAt, senderId }, i) => (
          <Message
            key={i}
            id={id}
            photoURL={photoURL}
            image={image}
            name={name}
            text={text}
            createdAt={createdAt}
            senderId={senderId}
            setReplyMessage={setReplyMessage}
          />
        )
      )}
    </div>
  );
}
