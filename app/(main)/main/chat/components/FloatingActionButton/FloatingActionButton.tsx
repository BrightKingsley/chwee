"use client";

import { useState } from "react";
import { AnimateInOut } from "@/components/shared";
import { PlusIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

import { CHATS, GROUPS, CHAT, CONNECT } from "@/constants/routes";

export default function FloatingActionButton({
  pathname,
}: {
  pathname: string;
}) {
  const [expandButton, setExpandButton] = useState(false);

  const groups = pathname.includes("group");

  const chats = pathname.includes("chat");

  return (
    <div
      className={`fixed z-10 flex items-center gap-2 p-1 text-xs bg-white ${
        expandButton ? "border" : ""
      }  rounded-xl bottom-20 right-8 border-primary whitespace-nowrap transition-all duration-200`}
    >
      <div
        className={`flex items-center gap-3 rounded-xl transition-all duration-400 ${
          expandButton ? "min-w-[5rem] opacity-100" : "w-0 opacity-0"
        }`}
      >
        {groups ? (
          <Link
            href={`${GROUPS}/create`}
            className={`p-4 text-white cursor-pointer bg-gradient-primary opacity-50 scale-90 rounded-xl transition-all duration-100 ${
              expandButton ? " scale-100" : "scale-0"
            }`}
          >
            New Group
          </Link>
        ) : (
          <></>
        )}

        <Link
          href={groups ? `${GROUPS}/discover` : `${CONNECT}`}
          className={`p-4 text-white cursor-pointer bg-gradient-primary opacity-50 scale-90 rounded-xl transition-all duration-100 ${
            expandButton ? " scale-100" : "scale-0"
          }`}
        >
          {groups ? "Discover" : "Connect"}
        </Link>
      </div>
      <button
        onClick={() => setExpandButton((prev) => !prev)}
        className="p-1 transition-all duration-200 bg-gradient-primary rounded-xl"
      >
        <PlusIcon
          className={`w-10 h-10 text-white transition-all duration-200 ${
            expandButton ? "rotate-45" : ""
          }`}
        />
      </button>
    </div>
  );
}
