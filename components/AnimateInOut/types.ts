import { AnimationProps, DraggableProps } from "framer-motion";
import { ComponentProps, HTMLProps } from "react";

export type AnimateInOutType = {
  children: React.ReactNode;
  className?: ComponentProps<"div">["className"];
  init: AnimationProps["initial"];
  animate: AnimationProps["animate"];
  out: AnimationProps["exit"];
  show?: boolean;
  drag?: DraggableProps["drag"];
  handleDragEnd?: Function;
};
