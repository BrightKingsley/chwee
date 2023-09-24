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

@post<EventCardClass>("save", (doc) => {
  if (doc) {
    doc.id = doc._id.toString();
    doc._id = doc.id;
  }
})
@post<EventCardClass[]>(/^find/, (docs) => {
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
class EventCardClass {
  @prop({ required: true })
  public name: string;

  // @prop({ required: true, ref: () => UserClass })
  // public owner: mongoose.Types.ObjectId;

  @prop({ required: true })
  public owner: mongoose.Types.ObjectId;

  id: string;

  _id: mongoose.Types.ObjectId | string;
}

const EventCard = getModelForClass(EventCardClass);
export { EventCard, EventCardClass };
