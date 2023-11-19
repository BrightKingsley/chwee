import { PushNotificationProvider } from "@/context";
import { Modal, Notification, TransactionForm } from "..";

const PortalElements = () => {
  return (
    <>
      <Modal />
      <Notification />
      <TransactionForm />
      <PushNotificationProvider />
    </>
  );
};

export default PortalElements;
