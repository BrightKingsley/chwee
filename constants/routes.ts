export const BASE_URL = typeof window !== "undefined" && window.location.origin;

console.log("BASE_URL", BASE_URL);

export const HOME = "/main/";
export const DASHBOARD = "/main/dashboard";
export const AUTH = "/main/auth";
export const LOGIN = `${AUTH}/login`;
export const REGISTER = `${AUTH}/register`;
export const USER_PROFILE = "/main/user-profile";
export const CHAT = "/main/chat";
export const CHATS = `${CHAT}/chats`;
export const GROUPS = `${CHAT}/groups`;
export const SETTINGS = "/main/settings";
export const MEMBER_INFO = "/main/member-info";
export const CHAT_SETTINGS = "/main/chat-settings";
export const ACCOUNT = "/main/account";
export const NOTIFICATIONS = "/main/notifications";
export const EVENTS = "/main/events";
export const CONNECT = "/main/connect";
export const WALLET = "/main/wallet";
export const ALL_CONNECT = `${CONNECT}/all`;
export const SUSPENDED_CONNECT = `${CONNECT}/suspended`;
export const OTHER = `${NOTIFICATIONS}/other`;
export const MEMBER_ACTIONS = `${NOTIFICATIONS}/member-actions`;
export const CHAT_NOTIFICATIONS = `${NOTIFICATIONS}/messaging`;
export const MY_EVENTS = `${EVENTS}/my-events`;
export const DISCOVER_EVENTS = `${EVENTS}/discover`;
export const REGISTERED_EVENTS = `${EVENTS}/registered`;
