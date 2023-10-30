import { MessageClass } from "@/models/Message";
import mongoose from "mongoose";

interface ClientUser {
  username: string;
  tag: string;
  photo: string;
  connections: (string | mongoose.Types.ObjectId)[];
  groups: (string | mongoose.Types.ObjectId)[];
  groupsRequested?: (string | mongoose.Types.ObjectId)[];
  chats: (string | mongoose.Types.ObjectId)[];
  _id: string;
}

interface ClientGroup {
  name: string;
  tag: string;
  owner: string;
  photo: string;
  description: string;
  hasPassWord: boolean;
  admins: (string | mongoose.Types.ObjectId)[];
  members: (string | mongoose.Types.ObjectId)[];
  _id: string;
}

interface ClientChat {
  _id: string;
  members: (string | mongoose.Types.ObjectId)[];
}

interface ClientMessage {
  userID: string;
  message: {
    message: MessageModelType;
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

// type MessageBody = {
//   textContent?: string;
//   sendDate: Date;
//   sender: string | undefined;
//   // imageContent: (Blob | Uint8Array | ArrayBuffer)[];
//   type: MessageClass["type"];
//   imageContent?: (string | StaticImport)[];
//   replyTo?: {
//     sender?: string | mongoose.Types.ObjectId;
//     textContent?: string;
//     imageContent?: string[];
//   };
//   transaction?: {
//     type: "send" | "request";
//     amount?: number;
//     receiver?: string;
//   };
// };

interface MessageModelType {
  sender?: mongoose.Types.ObjectId | string;
  imageContent?: string[];
  textContent?: string;
  // type: "fund" | "notification" | "conversation";
  type: MessageClass["type"];
  reactions?: {
    [key: string]: (string | mongoose.Types.ObjectId)[];
  };
  sendDate: Date;
  id?: mongoose.Types.ObjectId | string;
  replyTo?: {
    sender?: string;
    textContent?: string;
    imageContent?: string[];
  };
  transaction?: {
    receiver?: string;
    amount?: number;
    type: "send" | "request";
  };
}
