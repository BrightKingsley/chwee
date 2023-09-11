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

@post<TransactionClass>("save", (doc) => {
  if (doc) {
    doc.id = doc._id.toString();
    doc._id = doc.id;
  }
})
@post<TransactionClass[]>(/^find/, (docs) => {
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
    collection: "Transactions",
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
class TransactionClass {
  @prop({ required: true })
  public amount: number;

  @prop({ required: true })
  public date: Date;

  @prop({ enum: ["deposit", "withdrawal", "transfer"] })
  public type: string;

  _id: mongoose.Types.ObjectId | string;

  id: string;
}

const Transaction = getModelForClass(TransactionClass);

export { Transaction, TransactionClass };
