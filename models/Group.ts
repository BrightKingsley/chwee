import {
  getModelForClass,
  ModelOptions,
  Severity,
  prop,
  post,
  type Ref,
} from "@typegoose/typegoose";
import mongoose, { Schema } from "mongoose";
import { User, UserClass } from "./User";
import { MessageClass } from "./Message";
import { ConversationClass } from "./Conversation";

@post<GroupClass>("save", (doc) => {
  if (doc) {
    doc.id = doc._id.toString();
    doc._id = doc.id;
  }
})
@post<GroupClass[]>(/^find/, (docs) => {
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
    collection: "groups",
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})

// class Member extends UserClass {
//   isBlocked: false;
// }
class GroupClass {
  @prop({ required: true })
  public name: string;

  @prop({ required: true })
  public owner: mongoose.Types.ObjectId;

  @prop({ required: true, default: "" })
  public description: string;

  @prop({ required: false, default: "" })
  public password: string;

  @prop({
    required: true,
    default: [],
    type: mongoose.Types.ObjectId,
    ref: "user",
  })
  public admins: mongoose.Types.ObjectId[];

  /*
  @prop({
    required: true,
    type:()=>Set,
    // ref: () => UserClass,
  })
  // public members: Set<Ref<UserClass>>;
  public members: Set<mongoose.Types.ObjectId | string>;
  */

  @prop({
    required: true,
    // ref: () => UserClass,
    default: [],
  })
  public members: mongoose.Types.ObjectId[];

  // @prop({
  //   required: true,
  //   ref: () => ConversationClass,
  // })
  // public conversation: mongoose.Types.ObjectId;

  // @prop({ ref: () => UserClass })
  // public members: Ref<UserClass>[];

  // @prop({ required: true, ref: () => ConversationClass })
  // conversation: Ref<ConversationClass>;

  id: string;

  _id: mongoose.Types.ObjectId | string;
}

const Group = getModelForClass(GroupClass);
export { Group, GroupClass };
