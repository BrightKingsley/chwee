import { MouseEvent, ReactNode } from "react";

export type SlideInType = {
  children: ReactNode;
  className?: string;
  index: number;
  onClick?: Function;
};
