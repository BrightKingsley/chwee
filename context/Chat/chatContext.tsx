"use client";

import { BASE_URL } from "@/constants/routes";
import { ClientUser, MessageBody } from "@/types/models";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { createContext, useContext, useState } from "react";
import { ChatContextType } from "../types";
import NotificationContext from "../Notification/notificationContext";

const ChatContext = createContext<ChatContextType>({
  setToggleTransactionForm: () => {},
  toggleTransactionForm: {
    type: "send",
    show: false,
  },
  sendMessage: async () => await new Promise(() => {}),
  // selectedImages: [],
  replyMessage: {
    sender: "",
    imageContent: [],
    textContent: "",
  },
  setReplyMessage: () => {},
  setSelectedImages: () => {},
  resetInput: () => {},
  message: {
    imageContent: [],
    sendDate: new Date(),
    sender: "",
    textContent: "",
    type: "conversation",
    replyTo: undefined,
  },
  setMessage: () => {},
  membersModal: {
    loading: false,
    members: [],
    show: false,
    value: "",
  },
  selectedImages: [],
  setMembersModal: () => {},
  loading: false,
  setLoading: () => {},
  readURI: () => {},
  previewImages: {
    images: [],
    show: false,
  },
  setPreviewImages: () => {},
  viewImages: { clickedImage: 0, images: [] },
  setViewImages: () => {},
  inputRef: () => {},
  setInputRef: () => {},
});

export const ChatContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { triggerNotification } = useContext(NotificationContext);

  ////////////// AUTH //////////////////
  const { data } = useSession();
  const session: Session | null = data;
  ////////////// AUTH //////////////////

  ////////////// STATE //////////////////
  // This is useful for autofocus
  const [inputRef, setInputRef] =
    useState<React.MutableRefObject<HTMLInputElement>>();

  // Reply Message, Triggered from the ,message component ondrag (drag/slide to reply)
  const [replyMessage, setReplyMessage] = useState<{
    sender: string;
    textContent?: string;
    imageContent?: string[];
  }>({ sender: "", textContent: "", imageContent: [] });

  // Transaction Form State: Used to show form to input amount to send or receive
  const [toggleTransactionForm, setToggleTransactionForm] = useState<{
    type: "request" | "send";
    show: boolean;
  }>({
    type: "send",
    show: false,
  });

  // Preview Selected Images to send with message
  const [previewImages, setPreviewImages] = useState<{
    images: (string | any)[];
    show: boolean;
  }>({ images: [], show: false });

  // View sent Imagesin fullscreen
  const [viewImages, setViewImages] = useState<{
    images: string[];
    clickedImage: number;
  }>({
    images: [],
    clickedImage: 0,
  });

  // Selected Images to be sent to Uploadthing and returned a url links
  // @ts-ignore TODO check File Type
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  // Send Message Loading State
  const [loading, setLoading] = useState(false);

  // Message Data
  const [message, setMessage] = useState<MessageBody>({
    textContent: "",
    imageContent: [],
    sendDate: new Date(),
    type: "conversation",
    //TODO check this (!)
    sender: session?.user.id!,
    replyTo: replyMessage,
  });

  // Controls Modal toggled to view list of members in group
  const [membersModal, setMembersModal] = useState<{
    loading: boolean;
    show: boolean;
    members: ClientUser[];
    value: string;
  }>({
    loading: false,
    show: false,
    members: [],
    value: "",
  });
  ////////////// STATE //////////////////

  ////////////// FUNCTIONS //////////////////
  // NOTE: Send Message
  async function sendMessage({
    message,
    images = [],
    chatID,
    roomType,
  }: {
    message: MessageBody;
    chatID: string;
    roomType: string;
    images?: MessageBody["imageContent"];
  }) {
    let messageData = { ...message };
    if (images.length > 0) {
      messageData.sender = message.sender;
      messageData.imageContent = images;
    }
    try {
      setLoading(true);
      console.log("SENDING_MESSAGE ==>", { messageData, message });
      const res = await fetch(`${BASE_URL}/api/messaging/${chatID}`, {
        method: "POST",
        body: JSON.stringify({ message: messageData, roomType }),
      });

      const result = await res.json();

      console.log("MSG_RESULT", result);
      setLoading(false);
      resetInput();
      if (message.type === "fund") {
        // if (res.message !== "success") {
        return triggerNotification(result.message);
        // }
      }
      return result;
    } catch (error) {
      console.error({ error });
      return "an unexpected error occured";
    }
  }

  // NOTE: Reset All Inputs
  const resetInput = () => {
    console.log("resetting!");
    setMessage((prev) => ({
      ...prev,
      textContent: "",
      imageContent: [],
      replyTo: undefined,
      sendDate: new Date(),
      transaction: undefined,
      type: "conversation",
    }));
    setReplyMessage({ sender: "", imageContent: [], textContent: "" });
    setPreviewImages({ images: [], show: false });
    setSelectedImages([]);
    setMembersModal((prev) => ({ ...prev, value: "" }));
  };

  const readURI = (imgs: any[]) => {
    console.log("READ_REACHED", previewImages);
    imgs.forEach((img) => {
      if (img) {
        let reader = new FileReader();
        reader.onload = function (ev: ProgressEvent<FileReader>) {
          setPreviewImages((prev) => ({
            show: true,
            images: [...prev.images, ev.target?.result],
          }));
        };
        return reader.readAsDataURL(img);
      }
    });
  };
  ////////////// FUNCTIONS //////////////////

  return (
    <ChatContext.Provider
      value={{
        setToggleTransactionForm,
        toggleTransactionForm,
        sendMessage,
        selectedImages,
        replyMessage,
        setReplyMessage,
        setSelectedImages,
        resetInput,
        message,
        setMessage,
        membersModal,
        setMembersModal,
        loading,
        setLoading,
        readURI,
        previewImages,
        setPreviewImages,
        setViewImages,
        viewImages,
        inputRef,
        setInputRef,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext;
