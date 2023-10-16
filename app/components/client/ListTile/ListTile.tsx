"use client";

import { motion } from "framer-motion";
import { ListTileType } from "./types";
import { ListItem } from "@material-tailwind/react";
export default function MyListTile({
  children,
  className,
  index = 1,
  onClick,
  trailing = [],
  slide = false,
}: ListTileType) {
  return (
    <motion.div
      key={Math.random()}
      initial={{ x: slide ? 100 : undefined }}
      animate={{ x: slide ? 0 : undefined }}
      transition={{
        delay: slide ? index / 10 : undefined,
        duration: slide ? (index + 2.3) / 10 : undefined,
      }}
      className={`cursor-pointer active:scale-90 flex items-center w-full rounded-lg ${className}`}
    >
      <ListItem
        onClick={(e) => onClick && onClick(e)}
        className="flex-1 active:opacity-50 !p-0"
      >
        {children}
      </ListItem>
      {trailing.length > 0 && (
        <div className="ml-auto_">
          {trailing.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
