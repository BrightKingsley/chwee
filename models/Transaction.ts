import {
  ModelOptions,
  getModelForClass,
  prop,
  Severity,
  post,
  type Ref,
} from "@typegoose/typegoose";
import mongoose from "mongoose";
import { User } from "@/models";

// @post<TransactionClass>("save", (doc) => {
//   if (doc) {
//     doc.id = doc._id.toString();
//     doc._id = doc.id;
//   }
// })
// @post<TransactionClass[]>(/^find/, (docs) => {
//   // @ts-ignore
//   if (this.op === "find") {
//     docs.forEach((doc) => {
//       doc.id = doc._id.toString();
//       doc._id = doc.id;
//     });
//   }
// })
@ModelOptions({
  schemaOptions: {
    timestamps: true,
    collection: "transactions",
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
class TransactionClass {
  @prop({ required: true })
  public amount!: number;

  @prop({ required: true, ref: "User" })
  public sender!: mongoose.Types.ObjectId;

  @prop({ required: true, ref: "User" })
  public receiver!: mongoose.Types.ObjectId;

  @prop({ required: true })
  public date: Date;

  @prop({
    required: true,
    enum: ["deposit", "withdrawal", "transfer", "airtime", "data"],
  })
  public type: "deposit" | "withdrawal" | "transfer" | "airtime" | "data";

  @prop({
    required: true,
    enum: ["successful", "declined"],
  })
  status: "successful" | "declined";

  @prop({ required: true })
  public title: string;

  _id: mongoose.Types.ObjectId | string;

  id: string;
}

const Transaction = getModelForClass(TransactionClass);

export { Transaction, TransactionClass };
