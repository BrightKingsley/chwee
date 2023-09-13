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

@post<EventClass>("save", (doc) => {
  if (doc) {
    doc.id = doc._id.toString();
    doc._id = doc.id;
  }
})
@post<EventClass[]>(/^find/, (docs) => {
  // @ts-ignore
  if (this.op === "find") {
    docs.forEach((doc) => {
      if (doc) {
        doc.id = doc._id.toString();
        doc._id = doc.id;
      }
    });
  }
})
@ModelOptions({
  schemaOptions: {
    timestamps: true,
    collection: "events",
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
class EventClass {
  @prop({ required: true })
  public name: string;

  @prop({ required: true, ref: () => UserClass })
  public owner: Ref<UserClass>;

  @prop({ enum: ["deposit", "withdrawal", "transfer"] })
  public type: string;
  start: Date;

  end: Date;

  id: string;

  _id: mongoose.Types.ObjectId | string;
}

const Event = getModelForClass(EventClass);
export { Event, EventClass };
