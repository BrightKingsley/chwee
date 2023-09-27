"ue client";

import {
  XMarkIcon,
  EllipsisVerticalIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import { AnimateInOut, OptionsMenu } from "@/components";
import { Ref, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { MEMBER_INFO, USER_PROFILE } from "@/constants/routes";
import { MessageClass } from "@/models/Message";
import { useLongPress } from "@/hooks";
import { UserClass } from "@/models";
import { SendMessageType } from "../SendMessage/types";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import nft from "@/assets/images/nft.jpg";

interface ClientMessage {
  setReplyMessage: SendMessageType["setReplyMessage"];
  userID: string;
  message: {
    messageData: MessageClass;
    senderData: UserClass;
  };
  roomType: "group" | "p2p";
}

export default function Message({
  setReplyMessage,
  userID, //TODO typecheck
  message: messageWithSenderData,
  roomType,
}: ClientMessage) {
  const [showMore, setShowMore] = useState({ options: false, emojis: false });

  const { textContent, imageContent, sender, username, photo, replyTo } = {
    ...messageWithSenderData.messageData,
    ...messageWithSenderData.senderData,
  };

  const { data } = useSession();
  const session: Session | null = data;

  const messageRef = useRef<HTMLDivElement>();

  const gestures = useLongPress({
    callback: () => setShowMore((prev) => ({ ...prev, emojis: true })),
    duration: 800,
  });

  useEffect(() => {
    if (!showMore) return;
    const timeout = setTimeout(() => {
      setShowMore((prev) => ({ ...prev, emojis: false }));
    }, 3000);

    return () => clearTimeout(timeout);
  }, [showMore]);

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sender]);

  if (!session || !session.user || !session.user.id) return null;

  return (
    // @ts-ignore TODO
    <motion.div
      {...gestures}
      ref={messageRef as Ref<HTMLDivElement>}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.02 }}
      drag="x"
      dragElastic={{
        left: sender === userID ? 0.5 : 0,
        right: sender === userID ? 0 : 0.5,
      }}
      dragDirectionLock={true}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(e: PointerEvent, info) => {
        const offset = info.offset.x;
        console.log(offset);
        // setReplyMessage({sender:username sender === userID? session.user.name! :, textContent, imageConten});
        sender !== userID &&
          offset > 200 &&
          setReplyMessage({
            sender: sender === userID ? session.user.name! : username,
            textContent,
            imageContent,
          });
        sender === userID &&
          offset < -100 &&
          setReplyMessage({
            sender: sender === userID ? session.user.name! : username,
            textContent,
            imageContent,
          });
      }}
      // dragDirectionLock={true}
      // dragConstraints={{ left: 0, right: 0 }}
      // onDragEnd={(e: PointerEvent) => {
      //   console.log("replying");
      //   e.offsetX > 50 && setReplyMessage({sender:username sender === userID? session.user.name! :, textContent, imageConten});
      // }}
      className={`relative min-w-[10rem] cursor-grab active:cursor-grabbing active:bg-gray-200 flex px-[2px] flex-col max-w-[90%] ${
        sender === userID ? "bg-white TODO" : "bg-white"
      }  rounded-t-xl ${
        sender === userID
          ? "flex-row-reverse self-end rounded-l-xl"
          : "rounded-r-xl"
      } w-fit rounded-b-[0.2rem] `}
    >
      <AnimateInOut
        show={showMore.emojis}
        animate={{ scale: 1, opacity: 1 }}
        init={{ scale: 0.5, opacity: 0 }}
        out={{ scale: 0.5, opacity: 0 }}
        className={`absolute z-10 flex items-center gap-2 px-1 text-xl bg-white  rounded-full -top-8 ${
          sender === userID ? "-right-0" : "left-0"
        }`}
      >
        <span
          onClick={() => setShowMore((prev) => ({ ...prev, emojis: false }))}
          className="p-1 transition-all duration-200 rounded-full active:scale-95 hover:scale-125 hover:-rotate-12"
        >
          😂
        </span>
        <span
          onClick={() => setShowMore((prev) => ({ ...prev, emojis: false }))}
          className="p-1 transition-all duration-200 rounded-full active:scale-95 hover:scale-125 hover:-rotate-12"
        >
          💩
        </span>
        <span
          onClick={() => setShowMore((prev) => ({ ...prev, emojis: false }))}
          className="p-1 transition-all duration-200 rounded-full active:scale-95 hover:scale-125 hover:-rotate-12"
        >
          😢
        </span>
        <span
          onClick={() => setShowMore((prev) => ({ ...prev, emojis: false }))}
          className="p-1 transition-all duration-200 rounded-full active:scale-95 hover:scale-125 hover:-rotate-12"
        >
          😭
        </span>
        <span
          onClick={() => setShowMore((prev) => ({ ...prev, emojis: false }))}
          className="p-1 transition-all duration-200 rounded-full active:scale-95 hover:scale-125 hover:-rotate-12"
        >
          💔
        </span>
      </AnimateInOut>
      {replyTo?.sender && (
        <div
          className={`flex gap-2 bg-primary/30 my-[2px] pl-3 rounded-lg ___ relative_ p-1_ after:absolute after:left-1 w-full after:inset-0 after:bg-primary after:h-[80%] after:w-1 after:my-auto mx-auto after:rounded-full overflow-clip ${
            (replyTo.imageContent && replyTo.imageContent?.length > 0) ||
            (true && "")
          }`}
        >
          <div className="flex-1">
            <small className="font-bold_ text-primary">
              {replyTo.sender.toString() === session.user.name?.toString()
                ? "You"
                : replyTo.sender}
            </small>
            <p className="_replied-text_ text-sm font-bold text-gray-500 pb-1">
              {replyTo.textContent}
            </p>
          </div>
          {(replyTo.imageContent && replyTo.imageContent?.length > 0) ||
            (true && (
              <div className="w-20 min-h-[5rem] h-full ml-auto">
                <Image src={nft} alt="image content" fill />
              </div>
            ))}
        </div>
      )}
      {roomType === "group" && sender != userID && (
        <small className={sender === userID ? "text-end" : "text-start"}>
          {username}
        </small>
      )}
      <div className="relative flex flex-col">
        <div
          className={`absolute ${sender === userID ? "-left-10" : "-right-10"}
           ${imageContent?.length > 0 ? "top-10_" : "bottom-1"}
            text-2xl`}
        >
          {
            <button
              onClick={() =>
                setShowMore((prev) => ({ ...prev, options: !prev.options }))
              }
              className="p-3 text-gray-700 rounded-full hover:bg-white/20 active:scale-75 transition-all duration-200"
            >
              {showMore.options ? (
                <XMarkIcon className="w-6 h-6 text-gray-600" />
              ) : (
                <EllipsisVerticalIcon className="w-6 h-6 text-gray-600" />
              )}
            </button>
          }
          <OptionsMenu
            show={showMore.options}
            options={[
              {
                label: "reply",
                onClick: () => {
                  setReplyMessage({
                    sender: sender === userID ? session.user.name! : username,
                    textContent,
                    imageContent,
                  });
                },
              },
              {
                label: "start",
                onClick: () => {},
              },
              { label: "block", onClick: () => {} },
            ]}
          />
        </div>
        {/* <small className={sender === userID ? "text-end" : "text-start"}>
          {username}
        </small> */}
        <div
          className={`flex gap-2 ${
            sender === userID ? "flex-row-reverse" : ""
          }`}
        >
          {roomType === "group" && sender !== userID && (
            <Link
              href={`${USER_PROFILE}/${sender}`}
              className="w-7 h-7 translate-y-2_ shrink-0
          p-1 bg-primary rounded-full overflow-clip flex items-center justify-center
          "
            >
              {photo ? (
                <Image src={photo} alt="{user}" draggable={false} />
              ) : (
                <UserIcon className="w-5 h-5 fill-gray-300" />
              )}
            </Link>
          )}
          <div className="flex items-end justify-between gap-4 w-full">
            <p className={`p-1 flex-1`}>{textContent}</p>
            <small className="bottom-0 right-0 text-xs font-semibold text-gray-500">
              02:30
            </small>
          </div>
        </div>
        {/* {imageContent?.length > 0 && (
          <div className="w-40 h-32 rounded-md overflow-clip self-end_">
            {imageContent.map((image) => (
              <Image key={image} src={image} alt="sent by {user}" fill draggable={false} />
            ))}
          </div>
        )} */}
      </div>
    </motion.div>
  );
}