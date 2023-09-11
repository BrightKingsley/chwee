
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
  getChatId: () => Promise<string>;
  getMessages: () => Promise<MessageModel[]>;
};

// MODAL
type triggerModalType = {
  message?: string;
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
  modalMessage: string;
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
