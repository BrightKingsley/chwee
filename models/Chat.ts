import {
  getModelForClass,
  ModelOptions,
  Severity,
  prop,
  post,
  type Ref,
} from "@typegoose/typegoose";
import mongoose from "mongoose";
import { User, UserClass } from "./User";
import { MessageClass } from "./Message";
import { ConversationClass } from "./Conversation";

@post<ChatClass>("save", (doc) => {
  if (doc) {
    doc.id = doc._id.toString();
    doc._id = doc.id;
  }
})
@post<ChatClass[]>(/^find/, (docs) => {
  // @ts-ignore
  // if (docs.op === "find") {
  // docs.forEach((doc) => {
  //   doc.id = doc._id.toString();
  //   doc._id = doc.id;
  // });
  // }
})
@ModelOptions({
  schemaOptions: {
    timestamps: true,
    collection: "chats",
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})

// class Member extends UserClass {
//   isBlocked: false;
// }
class ChatClass {
  @prop({ required: false, default: "" })
  public password: string;

  @prop({
    required: true,
    default: [],
    type: [mongoose.Types.ObjectId],
    max: 2,
    ref: "user",
    unique: true,
  })
  public members: mongoose.Types.ObjectId[];

  // @prop({ required: true, ref: () => ConversationClass })
  // conversation: mongoose.Types.ObjectId;

  id: string;

  _id: mongoose.Types.ObjectId | string;
}

const Chat = getModelForClass(ChatClass);
export { Chat, ChatClass };
