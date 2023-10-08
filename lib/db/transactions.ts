import { Transaction } from "@/models";
import { connectDB } from ".";
import { stringToObjectId } from "../utils";
import { CLientTransaction } from "@/types/models";

export async function getTransactionByID({
  transactionID,
}: {
  transactionID: string;
}): Promise<CLientTransaction | null> {
  try {
    connectDB();
    const parsedTransactionID = stringToObjectId(transactionID);

    const transactionDoc = await Transaction.findById(parsedTransactionID);
    if (!transactionDoc) throw new Error("Transaction not found");

    const transaction: CLientTransaction = {
      _id: transactionDoc._id,
      amount: transactionDoc.amount,
      date: transactionDoc.date,
      title: transactionDoc.title,
      receiver: transactionDoc.receiver,
      sender: transactionDoc.sender,
      status: transactionDoc.status,
      type: transactionDoc.type,
    };

    return transaction;
  } catch (error) {
    console.error({ error });
    return null;
  }
}
