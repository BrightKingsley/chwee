"use client";

import { BASE_URL } from "@/constants/routes";
import { MessageBody } from "@/types/models";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { createContext, useContext, useState } from "react";
import { ChatContextType } from "../types";
import NotificationContext from "../Notification/notificationContext";
import { useImageUpload } from "@/hooks";

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
  messages: [
    {
      message: {},
      senderInfo: {},
    },
  ],
  setMessages: () => {},
  uploadProgress: 0,
  messagesLoading: false,
  setMessagesLoading: () => {},
  getInputProps: () => [] as any,
  startUpload: async () => await new Promise(() => {}),
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

  // Controls Incoming Messages
  const [messages, setMessages] = useState<
    {
      message: MessageBody;
      senderInfo: { username: string; tag: string; photo: string };
    }[]
  >([]);
  const [messagesLoading, setMessagesLoading] = useState(false);

  // Controls Modal toggled to view list of members in group
  const [membersModal, setMembersModal] = useState<{
    loading: boolean;
    show: boolean;
    members: { tag: string; username: string; photo: string }[];
    value: string;
  }>({
    loading: false,
    show: false,
    members: [],
    value: "",
  });
  ////////////// STATE //////////////////

  const { getInputProps, getRootProps, startUpload, uploadProgress } =
    useImageUpload({
      endpoint: "chatImageUploader",
      setImg: setSelectedImages,
      onClientUploadComplete(files) {
        console.log("FILES: ", files);

        const imageContent = files?.map((file) => file.url);

        console.log("IMAGE_CONTENT", imageContent);
        setMessage((prev) => ({
          ...prev,
          imageContent: imageContent as string[],
        }));
        const messageToSend: MessageBody = {
          ...message,
          sendDate: new Date(),
        };
        // sendMessage({
        //   message: messageToSend,
        //   chatID,
        //   roomType,
        //   images: imageContent,
        // });
      },
    });

  ////////////// FUNCTIONS //////////////////
  // NOTE: Send Message
  async function sendMessage({
    message,
    // images = [],
    chatID,
    roomType,
  }: {
    message: MessageBody;
    chatID: string;
    roomType: string;
    // images?: MessageBody["imageContent"];
  }) {
    let messageData = { ...message };
    messageData.sender = message.sender;
    resetInput();
    message.type !== "fund" &&
      setMessages((prev) => [
        ...prev,
        {
          message: { ...message, imageContent: previewImages.images },
          senderInfo: {
            username: session?.user.tag as string,
            photo: session?.user.image as string,
            tag: session?.user.tag as string,
          },
        },
      ]);
    try {
      setLoading(true);
      if (selectedImages.length > 0) {
        const res = await startUpload(selectedImages);
        if (!res) return triggerNotification("Image upload failed");
        const images = res.map((data) => data.url);
        console.log("IMAGE_RESPONSE", { res });
        messageData.imageContent = images;
      }
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
        if (!result) return triggerNotification("Couldn't make transaction");
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
        messages,
        setMessages,
        uploadProgress,
        messagesLoading,
        setMessagesLoading,
        getInputProps,
        startUpload,
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
