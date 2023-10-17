"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Overlay } from "./types";

export default function Overlay({
  children,
  disableOnClick,
  handleShowOverlay,
  show,
}: Overlay) {
  const overlayStyles = `fixed h-screen w-screen bg-primary/40 ${
    disableOnClick && "cursor-pointer"
  } top-0 left-0 flex items-center justify-center backdrop-blur-sm`;

  useEffect(() => {
    show &&
      window.addEventListener(
        "keydown",
        (e: KeyboardEvent) =>
          e.code === "Escape" && handleShowOverlay && handleShowOverlay()
      );
  });

  return (
    <AnimatePresence>
      {show &&
        (children ? (
          <motion.div
            onClick={
              disableOnClick && handleShowOverlay
                ? () => handleShowOverlay()
                : () => {}
            }
            title={disableOnClick ? "close" : ""}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={overlayStyles}
          >
            <OverlayChild show={show}>{children}</OverlayChild>
          </motion.div>
        ) : (
          <motion.div
            onClick={
              disableOnClick && handleShowOverlay
                ? () => handleShowOverlay()
                : () => {}
            }
            title={disableOnClick ? "close" : ""}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={overlayStyles}
          />
        ))}
    </AnimatePresence>
  );
}

function OverlayChild({
  show,
  children,
}: {
  show: boolean;
  children?: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ y: 50 }} animate={{ y: 0 }} exit={{ y: 50 }}>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* 
className={`fixed h-screen w-screen bg-primary/80 ${
            disableOnClick && "cursor-pointer"
          } before:w-full before:h-full before:absolute before:left-0 before:bg-primary before:opacity-40 top-0 left-0 flex items-center justify-center z-50 active:backdrop-blur-lg backdrop-blur-sm`}
*/

/*
 <AnimatePresence>
      {show &&
        (children ? (
          <motion.div
            className={
              "fixed h-screen w-screen bg-primary/80  before:w-full before:h-full before:absolute before:left-0 before:bg-primary before:opacity-40 top-0 left-0 flex items-center justify-center z-50 backdrop-blur-sm   "
            }
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={disableOnClick ? () => handleShowOverlay() : () => {}}
            title={disableOnClick ? "close" : ""}
          >
            <AnimatePresence>
              {show && (
                <motion.div
                  initial={{ y: 50 }}
                  animate={{ y: 0 }}
                  exit={{ y: 50 }}
                >
                  {children}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={"fixed h-screen w-screen bg-red-400 top-0 left-0 "}
            onClick={disableOnClick ? () => handleShowOverlay() : () => {}}
            title={disableOnClick ? "close" : ""}
          />
        ))}
    </AnimatePresence>
*/
