"use client";

import { ReactNode, createContext, useEffect, useState } from "react";
import { Notification } from "@/app/components/client";
import { NotificationContextType } from "../types";

const NotificationContext = createContext<NotificationContextType>({
  showNotification: false,
  triggerNotification: () => {},
  notificationMessage: "",
});

export const NotificationContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState<
    string | ReactNode
  >("");

  const triggerNotification = (message: string | ReactNode) => {
    setShowNotification(true);
    setNotificationMessage(message);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, [showNotification, setShowNotification]);

  return (
    <NotificationContext.Provider
      value={{ showNotification, triggerNotification, notificationMessage }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
