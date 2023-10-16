"use client";

import { IconButton } from "@/app/components/mui";
import { useState } from "react";

import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import Close from "@mui/icons-material/Close";
import ConnectButton from "../ConnectButton";
import { motion } from "framer-motion";
import DisconnectButton from "../DisconnectButton";
import AnimateInOut from "../AnimateInOut/AnimateInOut";

const actions = [
  {
    component: ConnectButton,
  },
  {
    component: DisconnectButton,
  },

  {
    component: DisconnectButton,
  },
  {
    component: DisconnectButton,
  },
  //TODO message Button
  // {
  //   component: ConnectButton,
  // },
];

export default function ConnectOptions({ userID }: { userID: string }) {
  const [open, setOpen] = useState(true);

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
          className="z-20 text-white bg-gray-600 rounded-full"
        >
          {open ? <Close /> : <MoreVertOutlinedIcon />}
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
              <div style={{ rotate: `${(i + 1) * 60}deg` }}>
                {component({
                  receiverID: userID,
                  color: "gray",
                  variant: "circle",
                })}
              </div>
            </AnimateInOut>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
