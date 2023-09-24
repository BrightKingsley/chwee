"use client";

import { createContext, useState } from "react";
import { Modal } from "@/components";

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
  const [modalState, setModalState] = useState<{
    showModal: boolean;
    actionConfirm: Function;
    actionCancel: Function;
    modalMessage: string;
    disableOnClick: boolean;
  }>({
    showModal: false,
    actionConfirm: () => {},
    actionCancel: () => {},
    modalMessage: "",
    disableOnClick: false,
  });

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
      ? setModalState((prev) => ({ ...prev, showModal: show }))
      : modalState.showModal
      ? setModalState((prev) => ({ ...prev, showModal: false }))
      : setModalState((prev) => ({ ...prev, showModal: true }));
    // showModal = showModal ? false : true;
    message && setModalState((prev) => ({ ...prev, modalMessage: message }));
    confirm &&
      typeof confirm === "function" &&
      setModalState((prev) => ({ ...prev, actionConfirm: confirm }));
    cancel &&
      typeof cancel === "function" &&
      setModalState((prev) => ({ ...prev, actionCancel: cancel }));
    typeof clickToDisable === "boolean" &&
      setModalState((prev) => ({ ...prev, disableOnClick: clickToDisable }));
  };

  return (
    <ModalContext.Provider
      value={{
        showModal: modalState.showModal,
        triggerModal,
        modalMessage: modalState.modalMessage,
        actionConfirm: modalState.actionConfirm,
        actionCancel: modalState.actionCancel,
        disableOnClick: modalState.disableOnClick,
      }}
    >
      <div>
        {children}
        <Modal />
      </div>
    </ModalContext.Provider>
  );
};

export default ModalContext;
