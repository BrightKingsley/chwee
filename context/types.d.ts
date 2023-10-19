import { ClientUser, MessageBody } from "@/types/models";

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
  toggleTransactionForm: {
    type: "request" | "send";
    show: boolean;
  };
  setToggleTransactionForm: React.Dispatch<
    React.SetStateAction<{
      type: "request" | "send";
      show: boolean;
    }>
  >;
  sendMessage: ({
    message,
    images = [],
    chatID,
    roomType,
  }: {
    message: MessageBody;
    chatID: string;
    roomType: string;
    images?: MessageBody["imageContent"];
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
  message: MessageBody;
  setMessage: React.Dispatch<React.SetStateAction<MessageBody>>;
  membersModal: {
    loading: boolean;
    show: boolean;
    members: ClientUser[];
    value: string;
  };
  setMembersModal: React.Dispatch<
    React.SetStateAction<{
      loading: boolean;
      show: boolean;
      members: ClientUser[];
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
