import { Transaction, User, Wallet } from "@/models";
import { stringToObjectId } from "../utils";
import mongoose from "mongoose";

export async function transferToChweeWallet({
  amount,
  senderID,
  receiverTag,
  receiverID: rID,
  findBy,
}: {
  amount: number;
  senderID: string;
  receiverTag?: string;
  receiverID?: string | mongoose.Types.ObjectId;
  findBy?: "tag" | "ID";
}) {
  try {
    const parsedSenderID = stringToObjectId(senderID);
    const parsedReceiverID =
      typeof rID === "string" ? stringToObjectId(rID) : rID;

    const senderWallet = await Wallet.findOne({
      owner: parsedSenderID,
    });

    if (!senderWallet) throw new Error("Couldnt find wallet document");

    console.log({ amount, receiverTag });

    // This tries to use receiverID passed as arguments into the function and if theres no receiver ID passed, it should find by receiverTag. If neither is provided, an error i thrown. This is done in order to avoid unnecessary Database queries
    let receiverID;
    if (parsedReceiverID) {
      if (!parsedReceiverID) throw new Error("Invalid ID");
      receiverID = parsedReceiverID;
    } else {
      if (!receiverTag) throw new Error("No User Tag passed");
      const receiverDoc = await User.findOne({ tag: receiverTag.trim() });
      if (!receiverDoc) throw new Error("Couldn't get Receiver document");
      receiverID = receiverDoc._id;
    }

    if (!receiverID) throw new Error("Invalid Receiver ID");

    const receiverWallet = await Wallet.findOne({
      owner: receiverID,
    });

    if (!(receiverWallet && senderWallet))
      return "Invalid Sender or Recipient Data";

    // TODO: use mongoose tranactions to handle these
    let transaction;
    if (senderWallet.balance < amount) {
      transaction = await Transaction.create({
        sender: parsedSenderID,
        receiver: receiverID,
        amount,
        date: new Date(),
        type: "transfer",
        title: "Trasfer to Chwee Walet",
        // TODO check status confirmation
        status: "declined",
      });
      return "Insufficient Balance";
    }

    transaction = await Transaction.create({
      sender: parsedSenderID,
      receiver: receiverID,
      amount,
      date: new Date(),
      type: "transfer",
      title: "Trasfer to Chwee Walet",
      // TODO check status confirmation
      status: "successful",
    });

    //Apply changes to wallet balance
    senderWallet.balance -= amount;
    receiverWallet.balance += amount;

    //Add transaction to wallet
    senderWallet.transactions.push(transaction._id);
    receiverWallet.transactions.push(transaction._id);

    senderWallet.save();
    receiverWallet.save();
    transaction.save();

    console.log("Transfer", { senderWallet, receiverWallet });

    return "success";
  } catch (error) {
    console.error({ error });
    return null;
  }
}
