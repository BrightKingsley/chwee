"use client";

import { createContext, useState } from "react";

const ChatContext = createContext<ChatContextType>({
  setToggleTransactionForm: () => {},
  toggleTransactionForm: {
    type: "send",
    show: false,
  },
});

export const ChatContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toggleTransactionForm, setToggleTransactionForm] = useState<{
    type: "request" | "send";
    show: boolean;
  }>({
    type: "send",
    show: false,
  });

  return (
    <ChatContext.Provider
      value={{ setToggleTransactionForm, toggleTransactionForm }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext;
