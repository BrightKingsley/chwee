import mongoose from "mongoose";

interface ClientUser {
  username: string;
  tag: string;
  photo: string;
  connections: (string | mongoose.Types.ObjectId)[];
  groups: (string | mongoose.Types.ObjectId)[];
  chats: (string | mongoose.Types.ObjectId)[];
  _id: string;
}

interface ClientGroup {
  name: string;
  tag: string;
  owner: string;
  photo: string;
  description: string;
  admins: (string | mongoose.Types.ObjectId)[];
  members: (string | mongoose.Types.ObjectId)[];
  _id: string;
}

interface ClientChat {
  _id: string;
  members: (string | mongoose.Types.ObjectId)[];
}

interface ClientMessage {
  setReplyMessage: SendMessageType["setReplyMessage"];
  userID: string;
  message: {
    message: MessageClass;
    senderInfo: UserClass;
  };
  // message: MessageClass & UserClass;
  roomType: "group" | "p2p";
}

interface ClientWallet {
  owner: string;
  balance: number;
  transactions: (string | mongoose.Types.ObjectId)[];
  _id: string;
}

interface ClientGroup {
  owner: string;
  name: string;
  description: string;
  admins: (string | mongoose.Types.ObjectId)[];
  photo: string;
  _id: string;
  // balance: number;
  // transactions: (string | mongoose.Types.ObjectId)[];
}

interface GroupInfo {
  name: string;
  description: string;
  photo: string;
  membersCount: number;
  owner: string;
  hasPassword: boolean;
  tag: string;
}

interface CLientTransaction {
  amount: number;
  sender: string | mongoose.Types.ObjectId;
  receiver: string | mongoose.Types.ObjectId;
  date: Date;
  type: "deposit" | "withdrawal" | "transfer" | "airtime" | "data";
  title: string;
  status: "successful" | "declined";
  _id: string | mongoose.Types.ObjectId | string;
}
