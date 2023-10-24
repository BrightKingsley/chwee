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

@post<FcmTokenClass>("save", function (doc) {
  if (doc) {
    doc.id = doc._id.toString();
    doc._id = doc.id;
  }
})
@post<FcmTokenClass[]>(/^find/, function (docs) {
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
    collection: "fcmToken",
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
@index({ tag: 1 })
class FcmTokenClass {
  @prop({ required: true, default: "" })
  public userID: mongoose.Types.ObjectId;

  @prop({ required: true, default: "" })
  public token: string;

  @prop({ required: true, default: new Date() })
  public timeStamp: Date;

  _id: mongoose.Types.ObjectId | string;

  public id: string;
}

const FcmToken = getModelForClass(FcmTokenClass);
export { FcmToken, FcmTokenClass };
