"use client"

import { createContext, useState } from "react";
import {Modal} from "@/components"

const ModalContext = createContext<ModalContextType>({
  showModal: false,
  triggerModal: () => {},
  modalMessage: "",
  actionConfirm: () => {},
  actionCancel: () => {},
  disableOnClick: false,
});

export const ModalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [showModal, setShowModal] = useState(false);
  const [actionConfirm, setActionConfirm] = useState<Function>(() => {});
  const [actionCancel, setActionCancel] = useState<Function>(() => {});
  const [modalMessage, setModalMessage] = useState<string>("");
  const [disableOnClick, setDisableOnClick] = useState<boolean>(false);

  const triggerModal = (
    { message, confirm, cancel, clickToDisable, show }: triggerModalType = {
      message: "",
      confirm: () => {},
      cancel: () => {},
      clickToDisable: false,
      show: false,
    }
  ) => {
    show !== undefined
      ? setShowModal(show)
      : showModal
      ? setShowModal(false)
      : setShowModal(true);
    // showModal = showModal ? false : true;
    message && setModalMessage(message);
    confirm && typeof confirm === "function" && setActionConfirm(confirm);
    cancel && typeof cancel === "function" && setActionCancel(cancel);
    typeof clickToDisable === "boolean" && setDisableOnClick(clickToDisable);
  };

  return (
    <ModalContext.Provider
      value={{
        showModal,
        triggerModal,
        modalMessage,
        actionConfirm,
        actionCancel,
        disableOnClick,
      }}
    >
      <>
<Modal/>
      {children}
      </>
    </ModalContext.Provider>
  );
};

export default ModalContext;
