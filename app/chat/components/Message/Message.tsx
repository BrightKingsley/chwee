"ue client"

import {XMarkIcon, EllipsisVerticalIcon  } from "@heroicons/react/20/solid";
import { OptionsMenu } from "@/components";
import { Ref, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { MEMBER_INFO } from "@/constants/routes";

export default function Message({
  photoURL,
  name,
  text,
  image,
  senderId,
  setReplyMessage,

  //TODO typecheck
}: any) {
  const [showOptions, setShowOptions] = useState(false);

  const messageRef = useRef<HTMLDivElement>();


  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [photoURL, name, text, image, senderId, setReplyMessage]);

  const myMessage = senderId ===" user?.uid";

  return (
    <motion.div
      ref={messageRef as Ref<HTMLDivElement>}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      drag="x"
      dragDirectionLock={true}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(e: PointerEvent) => {
        e.offsetX > 200 && setReplyMessage(text);
      }}
      className={`flex ${
        myMessage && "flex-row-reverse self-end"
      } gap-2 w-[90%]`}
    >
      {senderId != "user?.uid" && (
        <Link
          href={`${MEMBER_INFO}/${senderId}`}
          className="w-10 h-10 rounded-full overflow-clip shrink-0 translate-y-5"
        >
          <Image src={photoURL} alt="{user}" draggable={false} />
        </Link>
      )}
      <div className="relative flex flex-col">
        <div
          className={`absolute ${myMessage ? "-left-10" : "-right-10"} ${
            image ? "top-5" : ""
          }  text-2xl`}
        >
          {
            <button
              onClick={() => setShowOptions((prev) => !prev)}
              className="p-3 rounded-full md:hover:bg-white/30 active:bg-white/50 text-gray-700"
            >
              {showOptions ? <XMarkIcon /> : <EllipsisVerticalIcon />}
            </button>
          }
          <OptionsMenu
            show={showOptions}
            options={[
              {
                label: "reply",
                onClick: () => {},
              },
              {
                label: "start",
                onClick: () => {},
              },
              { label: "block", onClick: () => {} },
            ]}
          />
        </div>
        <div className={myMessage ? "text-end" : ""}>
          <small>{name}</small>
        </div>
        <div className="mb-1">
          <p
            className={`${
              myMessage ? "rounded-l-md" : "rounded-r-md"
            } bg-white p-2 rounded-b-md`}
          >
            {text}
          </p>
        </div>
        {image && (
          <div className="w-40 h-32 overflow-clip rounded-md self-end_">
            <Image src={image} alt="sent by {user}" fill draggable={false} />
          </div>
        )}
      </div>
    </motion.div>
  );
}
