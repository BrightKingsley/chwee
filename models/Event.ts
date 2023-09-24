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
  public title: string;

  public photo: string;

  // @prop({ required: true, ref: () => UserClass })
  // public host: mongoose.Types.ObjectId;

  @prop({ required: true })
  public host: mongoose.Types.ObjectId;

  public co_hosts?: mongoose.Types.ObjectId[];

  @prop({ required: true, default: [] })
  public participants?: mongoose.Types.ObjectId[];

  @prop({ required: true, default: "" })
  public description: string;

  @prop({ required: false, default: "" })
  public password: string;

  @prop({ enum: ["raffle"] })
  public type: string;

  start: Date;

  end: Date;

  id: string;

  _id: mongoose.Types.ObjectId | string;
}

const Event = getModelForClass(EventClass);
export { Event, EventClass };
