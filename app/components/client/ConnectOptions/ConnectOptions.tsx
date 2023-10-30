"use client";

import { IconButton } from "@/app/components/mui";
import { useState } from "react";

import More2LineIcon from "remixicon-react/More2LineIcon";
import CloseLineIcon from "remixicon-react/CloseLineIcon";
import ConnectButton from "../ConnectButton";
import { motion } from "framer-motion";
import DisconnectButton from "../DisconnectButton";
import AnimateInOut from "../AnimateInOut/AnimateInOut";
import MessageButton from "../MessageButton/MessageButton";
import TransferButton from "../TransferButton/TransferButton";

export default function ConnectOptions({
  chatID,
  connectID,
  userID,
  userTag,
}: {
  chatID: string | null;
  connectID: string;
  userID: string;
  userTag: string;
}) {
  const [open, setOpen] = useState(true);

  const actions = [
    {
      component: (
        <ConnectButton
          receiverID={userID}
          variant="filled"
          className="!text-green-400 !rounded-full !bg-green-400/10 shadow-green-400/20"
        />
      ),
    },
    {
      component: (
        <DisconnectButton
          receiverID={userID}
          className="!text-red-400 !rounded-full !bg-red-400/10 shadow-red-400/20"
          variant="filled"
        />
      ),
    },

    {
      component: (
        <MessageButton
          variant="filled"
          className="rounded-full bg-primary/10 !text-primary shadow-primary-400/20"
          chatID={chatID}
          users={[userID, connectID]}
        />
      ),
    },
    {
      component: (
        <TransferButton
          receiverTag={userTag}
          className="!text-brand-darkblue !rounded-full !bg-brand-darkblue/10 shadow-brand-darkblue/20"
          variant="filled"
        />
      ),
    },
    //TODO message Button
    // {
    //   component: ConnectButton,
    // },
  ];

  return (
    <div className="relative flex flex-col items-center w-full h-full">
      <motion.div
        animate={{ top: open ? "0" : "2rem" }}
        transition={{
          duration: 0.7,
          // delay: open ? 0.1 : actions.length * 0.15,
        }}
        className="cursor-pointer top-8"
      >
        <IconButton
          variant="filled"
          color="gray"
          onClick={() => setOpen((prev) => !prev)}
          className="z-20 text-white bg-gray-500 rounded-full"
        >
          {open ? <CloseLineIcon /> : <More2LineIcon />}
        </IconButton>
      </motion.div>
      {actions.map(({ component }, i) => (
        <motion.div
          // animate={{
          //   translateY: open ? `${(i + 1.2) * 100 + i * 8}%` : 0,
          //   opacity: open ? 1 : 0,
          // }}
          key={i}
          animate={{ rotate: open ? `-${(i + 1) * 60}deg` : 0 }}
          transition={{ duration: 0.6, delay: (i + 1) * 0.1 }}
          className={`absolute w-fit h-full top-0 z-10`}
        >
          <div className="relative z-10 flex items-center justify-center w-full h-full">
            <AnimateInOut
              init={{ opacity: 1, top: "auto" }}
              animate={{ opacity: 1, top: 0 }}
              out={{ opacity: 1, top: "auto" }}
              show={open}
              transition={{ duration: 0.6, delay: (i + 1) * 0.1 }}
              className="absolute top-auto z-10"
            >
              <div style={{ rotate: `${(i + 1) * 60}deg` }}>{component}</div>
            </AnimateInOut>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
