export type SendMessageType = {
  replyMessage: {
    sender: string;
    textContent?: string;
    imageContent?: string[];
  };
  setReplyMessage: React.Dispatch<
    React.SetStateAction<{
      sender: string;
      textContent?: string | undefined;
      imageContent?: string[] | undefined;
    }>
  >;
  chatID: string;
  roomType: "group" | "p2p";
};
