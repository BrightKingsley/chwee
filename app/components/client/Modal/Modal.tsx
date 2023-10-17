//@ts-nocheck
"use client";

import { useState } from "react";
import { KeyboardEventHandler, useContext, useEffect } from "react";
import { createPortal } from "react-dom";
import Overlay from "../Overlay";
import { Button, IconButton } from "@/app/components/mui";
import { ModalContext } from "@/context";
import Close from "../Close";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { AnimatePresence, motion } from "framer-motion";
import ClientOnlyPortal from "../ClientOnlyPortal";

export default function Modal() {
  const {
    showModal,
    triggerModal,
    modalMessage,
    actionConfirm,
    actionCancel,
    disableOnClick,
  } = useContext(ModalContext);

  const [domReady, setDomReady] = useState(false);

  useEffect(() => {
    setDomReady(true);
  }, []);
  if (domReady) {
    if (typeof window === "object") {
      return (
        <AnimatePresence>
          {showModal && (
            <ClientOnlyPortal selector={"#modal"}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full"
              >
                <Overlay
                  show={showModal}
                  handleShowOverlay={actionCancel}
                  disableOnClick={disableOnClick}
                />
                <AnimatePresence>
                  {showModal && (
                    <motion.div
                      className={
                        "bg-body relative rounded-xl p-2 pb-4 text-center space-y-8 w-11/12 sm:w-96 z-50"
                      }
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 50, opacity: 0 }}
                    >
                      <div className="absolute z-50 cursor-pointer right-1 top-1">
                        <IconButton
                          onClick={() => {
                            actionCancel()();
                          }}
                        >
                          <CloseOutlinedIcon />
                        </IconButton>
                      </div>
                      <div className={"break-all"}>{modalMessage}</div>
                      <div
                        className={"flex gap-8 mx-auto w-full justify-around"}
                      >
                        <Button
                          variant="text"
                          className="border border-red-500"
                          onClick={() => {
                            actionCancel();
                            triggerModal({});
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={() => {
                            actionConfirm();
                            triggerModal({ show: false });
                          }}
                        >
                          Confirm
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </ClientOnlyPortal>
          )}
        </AnimatePresence>
      );
    } else {
      return null;
    }
  } else {
    return null;
  }
}
