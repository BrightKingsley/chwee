export type SendMessageType = {
  replyMessage: string;
  setReplyMessage: Function;
  chatID:string;
  roomType: "group" | "p2p";
};
