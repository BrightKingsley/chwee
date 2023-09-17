import {
  getModelForClass,
  ModelOptions,
  Severity,
  post,
  prop,
  type Ref,
} from "@typegoose/typegoose";
import mongoose from "mongoose";
import { MessageClass } from "./Message";

@post<ConversationClass>("save", (doc) => {
  if (doc) {
    doc.id = doc._id.toString();
    doc._id = doc.id;
  }
})
@ModelOptions({
  schemaOptions: {
    collection: "conversations",
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
class ConversationClass {
  @prop({ required: true, type: ()=>[MessageClass], default: [] })
  public messages: MessageClass[];


  @prop({required:true})
  public chatID: mongoose.Types.ObjectId;

  _id: mongoose.Types.ObjectId | string;

  id: string;
}

const Conversation = getModelForClass(ConversationClass);
export { Conversation, ConversationClass };
