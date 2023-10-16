import React from "react";
import AnimateInOut from "../AnimateInOut";
import { OptionsMenuType } from "./types";
import { Button, ListItem } from "@/app/components/mui";

export default function OptionsMenu({ show, options }: OptionsMenuType) {
  return (
    <AnimateInOut
      init={{ opacity: 0, y: "-30%", scale: 0.8 }}
      animate={{ opacity: 1, y: "0", scale: 1 }}
      out={{ opacity: 0, y: "-30%", scale: 0.8 }}
      show={show}
      className={
        "bg-body z-20 border rounded-md w-fit space-y-2  shadow-md p-1 divide-y text-gray-500 flex flex-col whitespace-nowrap"
      }
    >
      {options
        .filter((option) => option !== null)
        .map((option, i) => {
          if (option !== null) {
            const { label, onClick } = option;
            return (
              <ListItem
                key={i}
                onClick={() => onClick()}
                className="px-4 py-1 !rounded-none"
              >
                {label}
              </ListItem>
            );
          }
        })}
    </AnimateInOut>
  );
}
