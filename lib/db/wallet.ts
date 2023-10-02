import { Wallet } from "@/models";
import connectDB from "./connect-db";
import { stringToObjectId } from "../utils";
import { WalletClass } from "@/models/Wallet";
import mongoose, { ObjectId } from "mongoose";
import { ClientWallet } from "@/types/models";

export async function createWallet({
  ownerID,
}: {
  ownerID: string | mongoose.Types.ObjectId;
}): Promise<ClientWallet | null> {
  console.log("CREA>TED_WALLET_OWNER", ownerID);
  try {
    await connectDB();

    // const parsedID = stringToObjectId(ownerID);

    const walletDoc = await Wallet.create({ owner: ownerID });

    if (!walletDoc) throw new Error("Couldn't Create Wallet");
    const wallet = {
      _id: walletDoc._id,
      balance: walletDoc.balance,
      owner: walletDoc.owner.toString(),
      transactions: walletDoc.transactions,
    };

    return wallet as ClientWallet;
  } catch (error: any) {
    console.error(error);
    return null;
  }
}

export async function getWallet({ ownerID }: { ownerID: string }) {
  try {
    await connectDB();

    const parsedID = stringToObjectId(ownerID);

    if (!parsedID) throw new Error("Invalid ID");

    const walletDoc = await Wallet.findOne({ owner: parsedID });

    if (!walletDoc) throw new Error("Wallet not found");
    const wallet = {
      _id: walletDoc._id.toString(),
      balance: walletDoc.balance,
      owner: walletDoc.owner.toString(),
      transactions: walletDoc.transactions,
    };

    return wallet as ClientWallet;
  } catch (error) {
    console.error(error);
    return null;
  }
}

interface WalletFilter {
  page?: number;
  limit?: number;
}

export async function getWallets(filter: WalletFilter = {}) {
  try {
    await connectDB();
    const page = filter.page ?? 1;
    const limit = filter.limit ?? 10;
    const skip = (page - 1) * limit;

    const wallets = await Wallet.find().skip(skip).limit(limit).lean().exec();

    console.log("WALLETS:", wallets);

    return { wallets };
  } catch (error) {
    return error;
  }
}
