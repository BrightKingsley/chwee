"use client";

import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { AnimateInOutType } from "./types";

export default function AnimateInOut({
  children,
  show,
  animate,
  init,
  out,
  drag,
  handleDragEnd,
  className,
  transition,
}: AnimateInOutType) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={init}
          animate={animate}
          exit={out}
          drag={drag}
          onDragEnd={() => handleDragEnd && handleDragEnd()}
          transition={transition}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
