import {
  ModelOptions,
  Severity,
  getModelForClass,
  index,
  post,
  prop,
  type Ref,
} from "@typegoose/typegoose";
import mongoose from "mongoose";
import { GroupClass } from "./Group";

@post<UserClass>("save", function (doc) {
  if (doc) {
    doc.id = doc._id.toString();
    doc._id = doc.id;
  }
})
@post<UserClass[]>(/^find/, function (docs) {
  // @ts-ignore
  if (this.op === "find") {
    docs.forEach((doc) => {
      doc.id = doc._id.toString();
      doc._id = doc.id;
    });
  }
})
@ModelOptions({
  schemaOptions: {
    timestamps: true,
    collection: "users",
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
@index({ tag: 1 })
class UserClass {
  @prop({ required: true })
  public username: string;

  @prop({ required: true, unique: true })
  public email: string;

  @prop({ required:false})
  public password?: string;

  @prop({ required: true, unique: true })
  public tag: string;

  @prop({
    required: true,
    default: [],
    type: mongoose.Types.ObjectId,
    ref: "User",
  })
  public connections: mongoose.Types.ObjectId[];

  // @prop({ required: true, ref: () => UserClass })
  // // public connections: Ref<UserClass>[];
  // public connections: mongoose.Types.ObjectId[];

  @prop({ required: true, ref: () => GroupClass })
  public groups: Ref<GroupClass>[];


  @prop()
  public photoURL: string;

  _id: mongoose.Types.ObjectId | string;

  id: string;
}

const User = getModelForClass(UserClass);
export { User, UserClass };
