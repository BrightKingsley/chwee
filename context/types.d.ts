import { ClientUser, MessageModelType, MessageModelType } from "@/types/models";
import { DropzoneInputProps } from "@uploadthing/react";
import { UploadFileResponse } from "uploadthing/client";

// AUTH
type signUpWithEmailAndPassword = {
  username: string;
  tag: string;
  email: string;
  password: string;
};

type loginWithEmailAndPassword = {
  email: string;
  password: string;
};

type AuthContextType = {
  user: UserModel | null;
  error: string;
  loading: boolean;
  setUser: Function;
  signUpWithEmailAndPassword: ({
    username,
    tag,
    email,
    password,
  }: signUpWithEmailAndPassword) => Promise<UserModel | null>;
  loginWithEmailAndPassword: ({
    email,
    password,
  }: loginWithEmailAndPassword) => Promise<UserModel | null>;
  logoutUser: Function;
  googleAuth: ({ username, tag }: { username: string; tag: string }) => {};
  token: string;
};

// CHAT

type ChatContextProviderType = {
  children: React.ReactNode;
};

type ChatContextType = {
  // toggleTransactionForm: {
  //   type: "request" | "send";
  //   show: boolean;
  // };
  // setToggleTransactionForm: React.Dispatch<
  //   React.SetStateAction<{
  //     type: "request" | "send";
  //     show: boolean;
  //   }>
  // >;
  hardReset: Function;
  chatID: string;
  setChatID: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: ({
    message,
    images = [],
    chatID,
    roomType,
  }: {
    message: MessageModelType;
    chatID: string;
    roomType: string;
    images?: MessageModelType["imageContent"];
  }) => Promise<{ message: string }>;
  replyMessage: {
    sender: string;
    textContent?: string | undefined;
    imageContent?: string[] | undefined;
  };
  setReplyMessage: Dispatch<
    SetStateAction<{
      sender: string;
      textContent?: string | undefined;
      imageContent?: string[] | undefined;
    }>
  >;
  // @ts-ignore
  selectedImages: File[];
  setSelectedImages: React.Dispatch<React.SetStateAction<File[]>>;
  resetInput: Function;
  message: MessageModelType;
  setMessage: React.Dispatch<React.SetStateAction<MessageModelType>>;
  membersModal: {
    loading: boolean;
    show: boolean;
    members: { tag: string; username: string; photo: string }[];
    value: string;
  };
  messages: {
    message: MessageClass;
    senderInfo: UserClass;
  }[];
  uploadProgress: number;
  messagesLoading: boolean;
  setMessages: React.Dispatch<
    React.SetStateAction<
      {
        message: MessageModelType;
        senderInfo: UserClass;
      }[]
    >
  >;
  setMessagesLoading: React.Dispatch<React.SetStateAction<boolean>>;
  getInputProps: <T extends DropzoneInputProps>(props?: T | undefined) => T;
  startUpload: (
    files: File[],
    input?: undefined
  ) => Promise<UploadFileResponse[] | undefined>;
  setMembersModal: React.Dispatch<
    React.SetStateAction<{
      loading: boolean;
      show: boolean;
      members: { tag: string; username: string; photo: string }[];
      value: string;
    }>
  >;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  readURI: (imgs: any[]) => void;
  previewImages: {
    images: (string | any)[];
    show: boolean;
  };
  setPreviewImages: React.Dispatch<
    React.SetStateAction<{
      images: (string | any)[];
      show: boolean;
    }>
  >;
  viewImages: {
    images: string[];
    clickedImage: number;
  };
  setViewImages: React.Dispatch<
    React.SetStateAction<{
      images: string[];
      clickedImage: number;
    }>
  >;
  inputRef: MutableRefObject<HTMLInputElement> | undefined;
  setInputRef: React.Dispatch<
    React.SetStateAction<MutableRefObject<HTMLInputElement> | undefined>
  >;
};

// MODAL
type triggerModalType = {
  message?: string | React.ReactNode;
  confirm?: Function;
  cancel?: Function;
  clickToDisable?: boolean;
  show?: boolean;
};

type ModalContextType = {
  showModal: boolean;
  triggerModal: ({
    message,
    confirm,
    cancel,
    clickToDisable,
  }: triggerModalType) => void;
  modalMessage: string | React.ReactNode;
  actionConfirm: Function;
  actionCancel: Function;
  disableOnClick: boolean;
};

// TRANSACTION
type triggerTransactionFormType = {
  message?: string | React.ReactNode;
  confirm?: TransactionContextType["transactionFormState"]["actionConfirm"];
  cancel?: Function;
  clickToDisable?: boolean;
  show?: boolean;
  type?: "request" | "send";
};

type TransactionContextType = {
  triggerTransactionForm: ({
    message,
    confirm,
    cancel,
    clickToDisable,
  }: triggerTransactionFormType) => void;
  transactionFormState: {
    showTransaction: boolean;
    actionConfirm?: (amount: number, type: "send" | "request") => void;
    actionCancel: Function;
    transactionMessage: string | React.ReactNode;
    disableOnClick: boolean;
    type: "request" | "send";
  };
  transferToChwee: ({
    finishTransaction,
    startTransaction,
    values,
  }: {
    startTransaction: (amount: number) => void;
    finishTransaction: Function;
    values: {
      receiverTag: string;
      amount: number;
      transferPin: number;
      accountType: "chwee";
    };
  }) => Promise<void>;
};

// NOTIFICATION

type NotificationContextType = {
  showNotification: boolean;
  triggerNotification: Function;
  notificationMessage: string | React.ReactNode;
};

// THEME
type ThemeContextProviderProps = {
  children: React.React.ReactNode;
};

type ThemeContextType = {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
};
