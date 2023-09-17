export const URL = process.env.NODE_ENV === "development"? "http://localhost:3000" : "https://chwee.vercel.app"

export const AUTH = "/auth";
export const LOGIN = `${AUTH}/login`;
export const REGISTER = `${AUTH}/register`;
export const CHAT = "/chat";
export const CHATS = `${CHAT}/chats`;
export const GROUPS = `${CHAT}/groups`;
export const SETTINGS = "/settings";
export const MEMBER_INFO = "/member-info";
export const CHAT_SETTINGS = "/chat-settings";
export const ACCOUNT = "/my-account";
export const NOTIFICATIONS = "/notifications";
export const EVENTS = "/events";
export const CONNECT = "/connect";
export const WALLET = "/wallet";
export const ALL_CONNECT = `${CONNECT}/all`;
export const SUSPENDED_CONNECT = `${CONNECT}/suspended`;
export const OTHER = `${NOTIFICATIONS}/other`;
export const MEMBER_ACTIONS = `${NOTIFICATIONS}/member-actions`;
export const CHAT_NOTIFICATIONS = `${NOTIFICATIONS}/chat`;
export const STATS = `${EVENTS}/stats`;
export const POLLS:string = `${EVENTS}/polls`;
