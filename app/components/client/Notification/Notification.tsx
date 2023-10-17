//@ts-nocheck
"use client";

import { useContext, useEffect, useState } from "react";

import { NotificationContext } from "@/context";

import { BellAlertIcon, BellIcon } from "@heroicons/react/20/solid";
import { AnimatePresence, motion } from "framer-motion";
import Media from "react-media";
import ClientOnlyPortal from "../ClientOnlyPortal/ClientOnlyPortal";

// const notification = document.getElementById("notification")!;
export default function Notification() {
  const { showNotification, notificationMessage } =
    useContext(NotificationContext);

  useEffect(() => {
    console.log("NOTIF", showNotification);
  }, [showNotification]);

  const [domReady, setDomReady] = useState(false);

  useEffect(() => {
    setDomReady(true);
  }, []);

  if (domReady) {
    if (typeof window === "object" && typeof window.document === "object") {
      return (
        <Media queries={{ small: { maxWidth: 640 } }}>
          {(matches) => (
            <AnimatePresence>
              {showNotification && (
                <ClientOnlyPortal selector={"#notification"}>
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
                    className="fixed inset-0 z-50 flex items-center w-11/12 gap-2 p-3 mx-auto bg-white rounded-lg shadow-lg md:w-80 md:rounded-xl outline outline-primary ring-offset-4 top-4 md:top-auto md:bottom-16 md:right-16 md:left-auto md:mx-0 h-fit shadow-primary/30 active:scale-90"
                  >
                    <span className="relative flex items-center justify-center text-primary">
                      <BellAlertIcon className="w-6 h-6 animate-ping" />
                      <BellIcon className="absolute w-6 h-6" />
                    </span>
                    <div className="text-gray-700 text-ellipsis w-full overflow-hidden">
                      {notificationMessage}
                    </div>
                  </motion.div>
                </ClientOnlyPortal>
              )}
            </AnimatePresence>
          )}
        </Media>
      );
    } else {
      return null;
    }
  } else {
    return null;
  }
}
