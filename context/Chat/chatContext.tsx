"use client"

import { createContext, useEffect, useState } from "react";

  //TODO typecheck
export const ChatContext = createContext<any>({


  getChatId: async () => "",
  getMessages: async () => Promise.resolve([]),
});

  //TODO typecheck
export const ChatContextProvider = ({ children }: any) => {

  // const [chatId, setChatId] = useState(""); // const { user } = useContext(AuthContext);

  //TODO typecheck
  return (
    <ChatContext.Provider value={{}}>
      {children}
    </ChatContext.Provider>
  );
};
export default ChatContext;
