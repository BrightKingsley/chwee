import {
  ModelOptions,
  type Ref,
  Severity,
  getModelForClass,
  post,
  prop,
} from "@typegoose/typegoose";
import mongoose from "mongoose";
import { User, UserClass } from "./User";
import { TransactionClass } from "./Transaction";

@post<WalletClass>("save", (doc) => {
  if (doc) {
    doc.id = doc._id.toString();
    doc._id = doc.id;
  }
})
// @post<WalletClass[]>(/^find/, (docs) => {
//   // @ts-ignore
//   // if (this.op === "find") {
//     docs.forEach((doc) => {
//       doc.id = doc._id.toString();
//       doc._id = doc.id;
//     });
//   // }
// })
@ModelOptions({
  schemaOptions: {
    timestamps: true,
    collection: "wallets",
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
class WalletClass {
  // @prop({ required: true, ref: () => UserClass })
  // public owner: mongoose.Types.ObjectId;

  @prop({ required: true })
  public owner: mongoose.Types.ObjectId;

  @prop({ required: true, default: 0 })
  public balance: number;

  @prop({ required: true, default: 1234 })
  public transferPin: number;

  // TODO
  @prop({ ref: () => TransactionClass })
  public transactions: Ref<TransactionClass>[];

  _id: mongoose.Types.ObjectId | string;

  id: string;
}

const Wallet = getModelForClass(WalletClass);
export { Wallet, WalletClass };
