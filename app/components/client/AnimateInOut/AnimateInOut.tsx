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
  onDragEnd,
  className,
  transition,
  dragConstraints,
  dragDirectionLock = true,
  dragElastic,
  onClick,
  title,
}: AnimateInOutType) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={init}
          animate={animate}
          exit={out}
          drag={drag}
          onClick={onClick}
          onDragEnd={(e: PointerEvent, info) => onDragEnd && onDragEnd(e, info)}
          dragConstraints={dragConstraints && dragConstraints}
          dragElastic={dragElastic && dragElastic}
          dragDirectionLock={dragDirectionLock}
          transition={transition}
          className={className}
          title={title}
          aria-label={title && title}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
