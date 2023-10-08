import {
  XMarkIcon,
  EllipsisVerticalIcon,
  UserIcon,
} from "@heroicons/react/20/solid";

import { AnimateInOut, OptionsMenu } from "@/components/shared";
import { Ref, memo, useEffect, useRef, useState } from "react";
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
import { IconButton } from "@mui/material";

interface ClientMessage {
  setReplyMessage: SendMessageType["setReplyMessage"];
  userID: string;
  message: {
    message: MessageClass;
    senderInfo: UserClass;
  };
  // message: MessageClass & UserClass;
  roomType: "group" | "p2p";
}

const emotes = ["😂", "💩", "😢", "😭", "💔"];

export default function Message({
  setReplyMessage,
  userID, //TODO typecheck
  message: messageWithSenderData,
  roomType,
}: ClientMessage) {
  const [showMore, setShowMore] = useState({ options: false, emojis: false });

  useEffect(() => {
    console.log("runnninnnnn");
  }, []);

  const { textContent, imageContent, sender, username, photo, replyTo } = {
    ...messageWithSenderData.senderInfo,
    ...messageWithSenderData.message,
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
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
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
        sender !== userID &&
          offset > 100 &&
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
      className={`relative min-w-[10rem] cursor-grab active:cursor-grabbing transition-colors duration-100 flex px-2 py-1 flex-col max-w-[90%] ${
        sender === userID
          ? "bg-primary text-white TODO"
          : "bg-brand-lightblue text-white"
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
        {emotes.map((emote, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, translateY: 5 }}
            animate={{ scale: 1, translateY: 0 }}
            transition={{ delay: i / 10 }}
            onClick={() => setShowMore((prev) => ({ ...prev, emojis: false }))}
            className="cursor-pointer"
          >
            <div className="p-1 transition-all duration-200 rounded-full active:scale-[10] active:rotate-12 hover:scale-150 active:z-20 text-2xl">
              {emote}
            </div>
          </motion.div>
        ))}
      </AnimateInOut>
      {replyTo?.sender && (
        <div
          className={`flex gap-2 bg-white my-[2px] pl-3 rounded-lg ___ relative_ p-1_ after:absolute after:left-1 w-full after:inset-0 ${
            sender === userID
              ? "after:bg-brand-yellow"
              : "after:bg-brand-darkblue"
          } after:h-[80%] after:w-1 after:my-auto mx-auto after:rounded-full overflow-clip ${
            replyTo.imageContent && replyTo.imageContent?.length > 0 && ""
          }`}
        >
          <div className="flex-1">
            <small className="font-bold_ text-primary">
              {replyTo.sender.toString() === session.user.name?.toString()
                ? "You"
                : replyTo.sender}
            </small>
            <p className="pb-1 text-sm font-bold text-gray-500 _replied-text_">
              {replyTo.textContent}
            </p>
          </div>
          {replyTo.imageContent && replyTo.imageContent?.length > 0 && (
            <div className="w-20 min-h-[5rem] h-full ml-auto">
              <Image src={imageContent[0]} alt="image content" fill />
            </div>
          )}
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
           ${imageContent?.length > 0 ? "top-10_" : "bottom-[2px]_"}
            text-2xl`}
        >
          {
            <IconButton
              onClick={() =>
                setShowMore((prev) => ({ ...prev, options: !prev.options }))
              }
              // className="p-3 text-gray-700 transition-all duration-200 rounded-full hover:bg-white/20 active:scale-75"
            >
              {showMore.options ? (
                <XMarkIcon className="w-6 h-6 text-gray-600" />
              ) : (
                <EllipsisVerticalIcon className="w-6 h-6 text-gray-600" />
              )}
            </IconButton>
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
        <div
          className={`flex gap-2 ${
            sender === userID ? "flex-row-reverse" : ""
          }`}
        >
          {roomType === "group" && sender !== userID && (
            <Link
              href={`${USER_PROFILE}/${sender}`}
              className="flex items-center justify-center p-1 rounded-full w-7 h-7 translate-y-2_ shrink-0 bg-primary overflow-clip "
            >
              {photo ? (
                <Image src={photo} alt="{user}" draggable={false} />
              ) : (
                <UserIcon className="w-5 h-5 fill-gray-300" />
              )}
            </Link>
          )}
          <div className="flex items-end justify-between w-full gap-4">
            {imageContent.length > 0
              ? imageContent.map((image, i) => (
                  // <></>
                  <div key={i} className="w-52 h-52">
                    <Image src={image} alt="message img" fill />
                  </div>
                ))
              : null}
            {/* {imageContent.length > 0 && (
                <img
                  src={imageContent[0]}
                  alt="message img"
                  width={300}
                  height={300}
                />
              )} */}
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
