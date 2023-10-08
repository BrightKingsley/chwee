"use client";

import { IconButton } from "@/components/mui";
import { useState } from "react";

import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import ConnectButton from "../ConnectButton";
import { motion } from "framer-motion";
import DisconnectButton from "../DisconnectButton";

const actions = [
  {
    component: ConnectButton,
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
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex flex-col items-center">
      <IconButton
        variant="filled"
        color="gray"
        onClick={() => setOpen((prev) => !prev)}
        className="z-20 text-white bg-gray-600 rounded-full"
      >
        <MoreVertOutlinedIcon />
      </IconButton>
      {actions.map(({ component }, i) => (
        <motion.div
          animate={{
            translateY: open ? `${(i + 1.2) * 100 + i * 8}%` : 0,
            opacity: open ? 1 : 0,
          }}
          key={i}
          className={`absolute top-0 z-10`}
        >
          {component({ receiverID: userID, color: "gray", variant: "circle" })}
        </motion.div>
      ))}
    </div>
  );
}
