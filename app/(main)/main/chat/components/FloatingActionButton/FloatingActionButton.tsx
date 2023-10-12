"use client";

import { useState } from "react";
import { AnimateInOut } from "@/components/shared";
import { PlusIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { motion } from "framer-motion";

import { CHATS, GROUPS, CHAT, CONNECT } from "@/constants/routes";
import { Button, IconButton } from "@/components/mui";

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
      }  rounded-xl bottom-20 right-8 border-primary whitespace-nowrap`}
    >
      <motion.div
        style={{ display: "flex" }}
        animate={{ width: expandButton ? (groups ? "14rem" : "6.5rem") : 0 }}
        className={`!flex items-center gap-3 rounded-xl `}
      >
        {groups && (
          <motion.div animate={{ width: expandButton ? "6.5rem" : 0 }}>
            <AnimateInOut
              className="transition-transform duration-200"
              init={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "6.5rem" }}
              out={{ opacity: 0, width: 0 }}
              transition={{ duration: expandButton ? 0.3 : 0.3 }}
              show={expandButton}
            >
              <Link href={`${GROUPS}/create`}>
                <Button className="!px-2" variant="gradient" fullWidth>
                  {"New Group"}
                </Button>
              </Link>
            </AnimateInOut>
          </motion.div>
        )}
        <motion.div animate={{ width: expandButton ? "6.5rem" : 0 }}>
          <AnimateInOut
            className="transition-transform duration-200"
            init={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "6.5rem" }}
            out={{ opacity: 0, width: 0 }}
            transition={{ duration: expandButton ? 0.3 : 0.3 }}
            show={expandButton}
          >
            <Link href={groups ? `${GROUPS}/discover` : `${CONNECT}`}>
              <Button className="!px-2" variant="gradient" fullWidth>
                {groups ? "Discover" : "Connect"}
              </Button>
            </Link>
          </AnimateInOut>
        </motion.div>
      </motion.div>
      <IconButton
        variant="gradient"
        onClick={() => setExpandButton((prev) => !prev)}
        className="p-1 transition-all duration-200 bg-gradient-primary rounded-xl"
      >
        <PlusIcon
          className={`w-10 h-10 text-white transition-all duration-200 ${
            expandButton ? "rotate-45" : ""
          }`}
        />
      </IconButton>
    </div>
  );
}
