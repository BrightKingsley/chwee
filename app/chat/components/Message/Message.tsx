"ue client";

import { XMarkIcon, EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { AnimateInOut, OptionsMenu } from "@/components";
import { Ref, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { MEMBER_INFO } from "@/constants/routes";
import { MessageClass } from "@/models/Message";
import { useLongPress } from "@/hooks";

interface ClientMessage extends MessageClass {
  setReplyMessage: Function;
  userID: string;
}

export default function Message({
  textContent,
  imageContent,
  sender,
  setReplyMessage,
  userID, //TODO typecheck
}: ClientMessage) {
  const [showMore, setShowMore] = useState({options:false, emojis:false});

  const messageRef = useRef<HTMLDivElement>();

  const gestures = useLongPress({
    callback: () => setShowMore(prev=>({...prev,emojis:true})),
    duration: 800,
  });


  useEffect(() => {
    if(!showMore)return
   const timeout= setTimeout(()=>{
setShowMore(prev=>({...prev,emojis:false}))
    },2000)

    return ()=>clearTimeout(timeout)
  }, [showMore]);

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sender]);

  return (
    // @ts-ignore TODO
    <motion.div
      {...gestures}
      ref={messageRef as Ref<HTMLDivElement>}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{  duration: 0.02 }}
      drag="x"
      dragElastic={{
        left: sender === userID ? 0.5 : 0,
        right: sender === userID ? 0 : 0.5,
      }}
      dragDirectionLock={true}
      dragConstraints={{ left: 0, right: 0, }}
      onDragEnd={(e:PointerEvent, info) => {
        const offset =  info.offset.x
        console.log(offset)
        // setReplyMessage(textContent);
        sender !== userID &&
          offset > 200 &&
          setReplyMessage(textContent);
        sender === userID &&
          offset < -100 &&
          setReplyMessage(textContent);
      }}

      // dragDirectionLock={true}
      // dragConstraints={{ left: 0, right: 0 }}
      // onDragEnd={(e: PointerEvent) => {
      //   console.log("replying");
      //   e.offsetX > 50 && setReplyMessage(textContent);
      // }}
      className={`relative cursor-pointer flex max-w-[90%] ${
        sender === userID && "flex-row-reverse self-end"
      } gap-2 w-fit`}
    >
      <AnimateInOut
        show={showMore.emojis}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        init={{ scale: 0.5, rotate: -15, opacity: 0 }}
        out={{ scale: 0.5, rotate: -15, opacity: 0 }}
        className="absolute z-10 flex items-center gap-2 px-1 text-xl bg-white rounded-full -top-8 -right-0"
      >
        <span
          onClick={() => setShowMore(prev=>({...prev,emojis:false}))}
          className="p-1 transition-all duration-200 rounded-full active:scale-95 hover:scale-125 hover:-rotate-12"
        >
          😂
        </span>
        <span
          onClick={() => setShowMore(prev=>({...prev,emojis:false}))}
          className="p-1 transition-all duration-200 rounded-full active:scale-95 hover:scale-125 hover:-rotate-12"
        >
          💩
        </span>
        <span
          onClick={() => setShowMore(prev=>({...prev,emojis:false}))}
          className="p-1 transition-all duration-200 rounded-full active:scale-95 hover:scale-125 hover:-rotate-12"
        >
          😢
        </span>
        <span
          onClick={() => setShowMore(prev=>({...prev,emojis:false}))}
          className="p-1 transition-all duration-200 rounded-full active:scale-95 hover:scale-125 hover:-rotate-12"
        >
          😭
        </span>
        <span
          onClick={() => setShowMore(prev=>({...prev,emojis:false}))}
          className="p-1 transition-all duration-200 rounded-full active:scale-95 hover:scale-125 hover:-rotate-12"
        >
          💔
        </span>
      </AnimateInOut>
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
          className={`absolute ${sender === userID ? "-left-10" : "-right-10"}
           ${
            imageContent?.length > 0 ? "top-5_" : ""
          }
            text-2xl`}
        >
          {
            <button
              onClick={() => setShowMore(prev=> ({...prev,options:!prev.options}))}
              className="p-3 text-gray-700 rounded-full hover:bg-white/20 active:scale-75 transition-all duration-200"
            >
              {showMore.options ? <XMarkIcon  className="w-6 h-6 text-gray-600" /> : <EllipsisVerticalIcon className="w-6 h-6 text-gray-600" />}
            </button>
          } 
          <OptionsMenu
            show={showMore.options}
            options={[
              {
                label: "reply",
                onClick: () => {
                  setReplyMessage(textContent)
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
