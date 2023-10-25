import { FcmToken, Transaction, User, Wallet } from "@/models";
import { formatToNumberWithDecimal, stringToObjectId } from "../utils";
import mongoose from "mongoose";
import { pushNotificationToUser } from "../config/notificationHandler";
import { createNotification } from "./notifications";
// import { sendNotification } from "../config/firebaseAdmin";

const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://chwee.vercel.app";

export async function transferToChweeWallet({
  amount: amnt,
  senderID,
  receiverTag,
  receiverID: rID = "",
  findBy,
}: {
  amount: number;
  senderID: string;
  receiverTag?: string;
  receiverID?: string | mongoose.Types.ObjectId;
  findBy?: "tag" | "ID";
}) {
  try {
    const amount = parseFloat(formatToNumberWithDecimal(amnt.toString()));

    if (!amount || amount < 1) return "invalid amount";
    const parsedSenderID = stringToObjectId(senderID);

    const senderWallet = await Wallet.findOne({
      owner: parsedSenderID,
    });

    if (!senderWallet) throw new Error("Couldnt find wallet document");

    console.log({ amount, receiverTag });

    // This tries to use receiverID passed as arguments into the function and if theres no receiver ID passed, it should find by receiverTag. If neither is provided, an error i thrown. This is done in order to avoid unnecessary Database queries
    let receiverID;
    if (rID) {
      const parsedReceiverID =
        typeof rID === "string" ? stringToObjectId(rID) : rID;
      if (!parsedReceiverID) throw new Error("Invalid ID");
      receiverID = parsedReceiverID;
    } else {
      if (!receiverTag) return "No User Tag passed";
      const receiverDoc = await User.findOne({ tag: receiverTag.trim() });
      if (!receiverDoc) return "Couldn't get User With Provided Tag";
      receiverID = receiverDoc._id;
    }

    if (!receiverID) return "Couldn't process Receiver";

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

      pushNotificationToUser({
        users: [senderID.toString()],
        title: "Transfer to chwee wallet",
        body: "Transaction failed. Insufficient balance",
        deep_link: `${baseUrl}/wallet/transaction-history/${transaction._id.toString()}`,
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

    await pushNotificationToUser({
      users: [senderID.toString()],
      title: "Debit",
      body: `Transfer of ₦${amount} successful`,
      deep_link: `${baseUrl}/wallet/transaction-history/${transaction._id.toString()}`,
    });
    await pushNotificationToUser({
      users: [receiverID.toString()],
      title: "Credit",
      body: `You received ₦${amount}`,
      deep_link: `${baseUrl}/wallet/transaction-history/${transaction._id.toString()}`,
    });
    await createNotification({
      userID: senderID,
      title: "Debit",
      body: "Transaction successful",
      route: `${baseUrl}/wallet/transaction-history/${transaction._id.toString()}`,
      type: "wallet",
    });
    await createNotification({
      userID: receiverID.toString(),
      title: "Credit",
      body: "Credit",
      route: `${baseUrl}/wallet/transaction-history/${transaction._id.toString()}`,
      type: "wallet",
    });

    console.log("Transfer", { senderWallet, receiverWallet });

    return "success";
  } catch (error) {
    console.error({ error });
    return null;
  }
}
