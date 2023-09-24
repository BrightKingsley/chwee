export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://chwee.vercel.app";

export const HOME = "/";
export const AUTH = "/auth";
export const LOGIN = `${AUTH}/login`;
export const REGISTER = `${AUTH}/register`;
export const USER_PROFILE = "/user-profile";
export const CHAT = "/chat";
export const CHATS = `${CHAT}/chats`;
export const GROUPS = `${CHAT}/groups`;
export const SETTINGS = "/settings";
export const MEMBER_INFO = "/member-info";
export const CHAT_SETTINGS = "/chat-settings";
export const ACCOUNT = "/account";
export const NOTIFICATIONS = "/notifications";
export const EVENTS = "/events";
export const CONNECT = "/connect";
export const WALLET = "/wallet";
export const ALL_CONNECT = `${CONNECT}/all`;
export const SUSPENDED_CONNECT = `${CONNECT}/suspended`;
export const OTHER = `${NOTIFICATIONS}/other`;
export const MEMBER_ACTIONS = `${NOTIFICATIONS}/member-actions`;
export const CHAT_NOTIFICATIONS = `${NOTIFICATIONS}/messaging`;
export const MY_EVENTS = `${EVENTS}/my-events`;
export const DISCOVER_EVENTS = `${EVENTS}/discover`;
export const REGISTERED_EVENTS = `${EVENTS}/registered`;
