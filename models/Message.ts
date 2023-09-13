import {
  getModelForClass,
  ModelOptions,
  Severity,
  post,
  prop,
  type Ref,
} from "@typegoose/typegoose";
import mongoose from "mongoose";
import { UserClass } from "./User";

// @post<MessageClass>("save", (doc) => {
//   if (doc) {
//     doc.id = doc._id.toString();
//     doc._id = doc.id;
//   }
// })
// @post<MessageClass[]>(/^find/, (docs) => {
//   // @ts-ignore
//   if (this.op === "find") {
//     docs.forEach((doc) => {
//       doc.id = doc._id.toString();
//       doc._id = doc.id;
//     });
//   }
// })
// @ModelOptions({
//   schemaOptions: {
//     timestamps: true,
//     collection: "Messages",
//   },
//   options: {
//     allowMixed: Severity.ALLOW,
//   },
// })
class MessageClass {
  @prop({ required: true, ref: () => UserClass })
  public sender: Ref<UserClass>;

  @prop({})
  public imageContent: string;

  @prop({})
  public textContent: string;

  @prop({ ref: () => MessageClass })
  public replyTo: Ref<MessageClass>;

  @prop({ required: true })
  public sendDate: Date;

  id: string;

  _id: mongoose.Types.ObjectId | string;
}

export {  MessageClass };
