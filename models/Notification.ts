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

@post<NotificationClass>("save", function (doc) {
  if (doc) {
    doc.id = doc._id.toString();
    doc._id = doc.id;
  }
})
@post<NotificationClass[]>(/^find/, function (docs) {
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
    collection: "notifications",
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
@index({ userID: 1, isRead: 1 })
class NotificationClass {
  @prop({ required: true, default: "" })
  public userID: mongoose.Types.ObjectId;

  @prop({ required: true, default: "" })
  public title: string;

  @prop({ required: true, default: "" })
  public body: string;

  @prop({ required: true, default: new Date() })
  public timeStamp: Date;

  @prop({ required: true, default: false })
  public isRead: boolean;

  @prop({ required: true, default: "" })
  public route: string;

  @prop({
    required: true,
    default: false,
    enum: ["wallet", "connection", "group"],
  })
  public type: "wallet" | "connection" | "group";

  _id: mongoose.Types.ObjectId | string;

  public id: string;
}

const Notification = getModelForClass(NotificationClass);
export { Notification, NotificationClass };
