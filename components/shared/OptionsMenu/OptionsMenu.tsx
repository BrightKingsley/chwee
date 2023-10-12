import React from "react";
import AnimateInOut from "../AnimateInOut";
import { OptionsMenuType } from "./types";
import { Button, ListItem } from "@/components/mui";

export default function OptionsMenu({ show, options }: OptionsMenuType) {
  return (
    <AnimateInOut
      init={{ opacity: 0, y: "-30%", scale: 0.8 }}
      animate={{ opacity: 1, y: "0", scale: 1 }}
      out={{ opacity: 0, y: "-30%", scale: 0.8 }}
      show={show}
      className={
        "bg-body z-20 border rounded-md w-fit  shadow-md p-1 divide-y text-sm text-gray-500 flex flex-col whitespace-nowrap"
      }
    >
      {options.map(({ label, onClick }) => (
        <ListItem
          key={Math.random()}
          onClick={() => onClick()}
          className="px-4 py-1"
        >
          {label}
        </ListItem>
      ))}
    </AnimateInOut>
  );
}
