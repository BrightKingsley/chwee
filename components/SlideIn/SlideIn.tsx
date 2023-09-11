"use client"

import { motion } from "framer-motion";
import { SlideInType } from "./types";
export default function SlideIn({
  children,
  className,
  index,
  onClick,
}: SlideInType) {
  return (
    <motion.button
      key={Math.random()}
      onClick={(e) => onClick && onClick(e)}
      initial={{ x: 100 }}
      animate={{ x: 0 }}
      transition={{ delay: index / 10, duration: (index + 3) / 10 }}
      className={className}
    >
      {children}
    </motion.button>
  );
}
