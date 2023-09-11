"use client";

import React, { useContext, useEffect } from "react";
import { createPortal } from "react-dom";

import { NotificationContext } from "../../context";

import { BellAlertIcon } from "@heroicons/react/20/solid";
import { AnimatePresence, motion } from "framer-motion";
import Media from "react-media";

// const notification = document.getElementById("notification")!;
export default function Notification() {
  const { showNotification, notificationMessage } =
    useContext(NotificationContext);

    const [domReady, setDomReady] = React.useState(false);

    useEffect(() => {
      setDomReady(true);
    }, []);

if(domReady){


  if (typeof window === "object" && typeof window.document === "object") {
    return createPortal(
      <Media queries={{ small: { maxWidth: 576 } }}>
        {(matches) => (
          <AnimatePresence>
            {showNotification && (
              <motion.div
                initial={{
                  opacity: 0,
                  x: matches.small ? 0 : "100%",
                  y: matches.small ? "-100%" : 0,
                  scale: 0,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  x: matches.small ? 0 : "100%",
                  y: matches.small ? "-100%" : 0,
                  scale: 0,
                }}
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                className="fixed z-50 flex items-center w-11/12 gap-2 p-3 -translate-x-1/2 bg-white rounded-lg shadow-lg right-16_ sm:w-80 sm:rounded-xl outline outline-primary ring-offset-4 top-4 sm:top-auto sm:bottom-16 inset-0_ mx-auto_ h-fit shadow-primary/30 left-1/2"
              >
                <span className="text-primary">
                  <BellAlertIcon />
                </span>
                <div className="text-gray-700">{notificationMessage}</div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </Media>,
      document.getElementById("notification")!
    );
  } else {
    return null;
  }}else{
    return null
  }
};

