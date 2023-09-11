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

@post<GroupClass>("save", (doc) => {
  if (doc) {
    doc.id = doc._id.toString();
    doc._id = doc.id;
  }
})
@post<GroupClass[]>(/^find/, (docs) => {
  // @ts-ignore
  if (docs.op === "find") {
    docs.forEach((doc) => {
      doc.id = doc._id.toString();
      doc._id = doc.id;
    });
  }
})
@ModelOptions({
  schemaOptions: {
    timestamps: true,
    collection: "Groups",
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

  @prop({ required: true, default: "" })
  public description: string;

  // @prop({ required: true, type: () => [Member] })
  // public members: Member[];

  //   @prop({ required: true, ref: () => UserClass() })
  // public members: Ref<UserClass>[];

  @prop({
    required: true,
    default: [],
    type: mongoose.Types.ObjectId,
    ref: "User",
  })
  public members: mongoose.Types.ObjectId[];

  id: string;

  _id: mongoose.Types.ObjectId | string;
}

const Group = getModelForClass(GroupClass);
export { Group, GroupClass };
