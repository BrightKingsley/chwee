import React from "react";
import AnimateInOut from "../AnimateInOut";
import { OptionsMenuType } from "./types";

export default function OptionsMenu({ show, options }: OptionsMenuType) {
  return (
    <AnimateInOut
      init={{ opacity: 0, y: "-30%", scale: 0.8 }}
      animate={{ opacity: 1, y: "0", scale: 1 }}
      out={{ opacity: 0, y: "-30%", scale: 0.8 }}
      show={show}
      className={
        "bg-body z-20 rounded-md w-fit text-center shadow-md p-1 fixed divide-y text-sm mt- text-gray-500"
      }
    >
      {options.map(({ label, onClick }) => (
        <button
          key={Math.random()}
          onClick={() => onClick()}
          className="px-4 py-1"
        >
          {label}
        </button>
      ))}
    </AnimateInOut>
  );
}
