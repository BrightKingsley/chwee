import { Transaction, User, Wallet } from "@/models";
import { stringToObjectId } from "../utils";

export async function transferToChweeWallet({
  amount,
  senderID,
  receiverTag,
}: {
  amount: number;
  senderID: string;
  receiverTag: string;
}) {
  try {
    const parsedSenderID = stringToObjectId(senderID);

    const senderWallet = await Wallet.findOne({
      owner: parsedSenderID,
    });
    console.log({ amount, receiverTag });

    const receiverDoc: any = await User.findOne({ tag: receiverTag.trim() });

    if (!receiverDoc) return "Invalid User Tag";

    console.log("RECEIVER_DOC: ", receiverDoc);

    const receiverWallet = await Wallet.findOne({
      owner: receiverDoc._id,
    });

    if (!(receiverWallet && senderWallet))
      return "Invalid Sender or Recipient Data";

    if (senderWallet.balance < amount) {
      const transaction = await Transaction.create({
        sender: parsedSenderID,
        receiver: receiverDoc._id,
        amount,
        date: new Date(),
        type: "transfer",
        title: "Trasfer to Chwee Walet",
        // TODO check status confirmation
        status: "declined",
      });
      return "Insufficient Balance";
    }

    const transaction = await Transaction.create({
      sender: parsedSenderID,
      receiver: receiverDoc._id,
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
    return "An error Occured";
  }
}
