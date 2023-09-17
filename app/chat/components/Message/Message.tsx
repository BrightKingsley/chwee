"ue client"

import {XMarkIcon, EllipsisVerticalIcon  } from "@heroicons/react/20/solid";
import { AnimateInOut,OptionsMenu } from "@/components";
import { Ref, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { MEMBER_INFO } from "@/constants/routes";
import { MessageClass } from "@/models/Message";
import {useLongPress} from "@/hooks"



interface ClientMessage extends MessageClass{
  setReplyMessage: Function
  userID:string
}

export default function Message({
  textContent,
  imageContent,
  sender,
  setReplyMessage,
userID  //TODO typecheck
}: ClientMessage) {
  const [showOptions, setShowOptions] = useState(false);

  const messageRef = useRef<HTMLDivElement>();




const gestures = useLongPress({callback:()=>setShowOptions(true),duration:800})

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sender]);
  
  return (
    <motion.div
    {...gestures}
      ref={messageRef as Ref<HTMLDivElement>}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      drag="x"
      dragDirectionLock={true}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(e: PointerEvent) => {
        e.offsetX > 200 && setReplyMessage(textContent);
      }}
      className={`relative cursor-pointer flex ${sender === userID && "flex-row-reverse self-end"} gap-2 w-fit`}
    >
      <AnimateInOut show={showOptions} animate={{scale:1, rotate:0, opacity:1}}  init={{scale:0.5, rotate:-15,opacity:0}} out={{scale:0.5, rotate:-15,opacity:0}} className="absolute flex gap-2 items-center rounded-full bg-white -top-8 -right-0 z-10 text-xl px-1"><span onClick={()=>setShowOptions(false)} className="p-1 rounded-full active:scale-95 hover:scale-125 hover:-rotate-12 transition-all duration-200">😂</span><span onClick={()=>setShowOptions(false)} className="p-1 rounded-full active:scale-95 hover:scale-125 hover:-rotate-12 transition-all duration-200">💩</span><span onClick={()=>setShowOptions(false)} className="p-1 rounded-full active:scale-95 hover:scale-125 hover:-rotate-12 transition-all duration-200">😢</span><span onClick={()=>setShowOptions(false)} className="p-1 rounded-full active:scale-95 hover:scale-125 hover:-rotate-12 transition-all duration-200">😭</span><span onClick={()=>setShowOptions(false)} className="p-1 rounded-full active:scale-95 hover:scale-125 hover:-rotate-12 transition-all duration-200">💔</span></AnimateInOut>
      {/* {sender != "user?.uid" && (
        <Link
          href={`${MEMBER_INFO}/${sender}`}
          className="w-10 h-10 translate-y-5 rounded-full overflow-clip shrink-0"
        >
          <Image src={photoURL} alt="{user}" draggable={false} />
        </Link>
      )} */}
      <div className="relative flex flex-col">
        <div
          className={`absolute ${true ? "-left-10" : "-right-10"} ${
            imageContent?.length > 0 ? "top-5" : ""
          }  text-2xl`}
        >
          {
            <button
              onClick={() => setShowOptions((prev) => !prev)}
              className="p-3 text-gray-700 rounded-full md:hover:bg-white/30 active:bg-white/50"
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
        <div className={true ? "text-end" : ""}>
          {/* <small>{name}</small> */}
        </div>
        <div className="mb-1">
          <p
            className={`${
              sender === userID ? "rounded-l-2xl" : "rounded-r-2xl"
            } bg-white p-2 rounded-b-2xl`}
          >
            {textContent}
          </p>
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
