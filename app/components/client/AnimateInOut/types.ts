import {
  AnimationProps,
  DraggableProps,
  ForwardRefComponent,
  HTMLMotionProps,
} from "framer-motion";
import { ComponentProps, HTMLProps } from "react";

export type AnimateInOutType = {
  children?: React.ReactNode;
  className?: ComponentProps<"div">["className"];
  init: AnimationProps["initial"];
  animate: AnimationProps["animate"];
  out: AnimationProps["exit"];
  show?: boolean;
  drag?: DraggableProps["drag"];
  dragElastic?: DraggableProps["dragElastic"];
  dragDirectionLock?: DraggableProps["dragDirectionLock"];
  dragConstraints?: DraggableProps["dragConstraints"];
  onDragEnd?: DraggableProps["onDragEnd"];
  transition?: AnimationProps["transition"];
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
  title?: string;
};
