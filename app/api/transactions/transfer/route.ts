import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { stringToObjectId } from "@/lib/utils";
import { Transaction, User, UserClass, Wallet, WalletClass } from "@/models";
import { getUserByID, getUserByTag } from "@/lib/db";
import { Document } from "mongoose";
import {
  BeAnObject,
  IObjectWithTypegooseFunction,
} from "@typegoose/typegoose/lib/types";
import { Types } from "mongoose";

type PostProps = {
  accountType: "chwee" | "bank";
  receiverTag: string;
  amount?: number;
  transferPin: number;
};

export async function POST(request: NextRequest) {
  try {
    const res: PostProps = await request.json();
    const { accountType, transferPin } = res;

    console.log("RES", res);
    // const token = await getToken({ req: request, secret });

    const session = await getServerSession(authOptions);

    console.log("POST_WALLET_SESSION", session);

    const senderID = session?.user.id;
    if (!senderID)
      return NextResponse.json({
        error: { message: "Unauthenticated (USerID)" },
      });

    const parsedSenderID = stringToObjectId(senderID);

    const senderWallet = await Wallet.findOne({
      owner: parsedSenderID,
    });

    if (accountType === "chwee") {
      const { amount, receiverTag } = res;

      console.log({ amount, receiverTag });

      const receiverDoc: any = await User.findOne({ tag: receiverTag.trim() });

      if (!(amount && receiverDoc) || receiverDoc.error)
        return NextResponse.json({
          error: { message: "Invalid Amount (AMOUNT)", data: { receiverDoc } },
        });

      console.log("RECEIVER_DOC: ", receiverDoc);

      const receiverWallet = await Wallet.findOne({
        owner: receiverDoc._id,
      });

      if (!(receiverWallet && senderWallet))
        return NextResponse.json({
          error: {
            message: "Invalid Sender or Recipient Data",
            data: {
              receiverWallet,
              senderWallet,
            },
          },
        });

      if (senderWallet.balance < amount)
        return NextResponse.json({
          error: { message: "Insufficient Balance" },
        });

      const transaction = await Transaction.create({
        sender: parsedSenderID,
        receiver: receiverDoc._id,
        amount,
        date: new Date(),
        type: "transfer",
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

      return NextResponse.json({ message: "success" });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: { message: "an error occured on the server, please try again" },
    });
  }
}
