import { Wallet } from "@/models";
import connectDB from "./connect-db";
import { stringToObjectId } from "../utils";
import { WalletClass } from "@/models/Wallet";

export async function createWallet({
  ownerID,
}: {
  ownerID: string;
}): Promise<WalletClass> {
  console.log("CREA>TED_WALLET_OWNER", ownerID);
  try {
    await connectDB();

    const parsedID = stringToObjectId(ownerID);

    const wallet = await Wallet.create({ owner: parsedID });
    return wallet;
  } catch (error: any) {
    return error;
  }
}

export async function getWallet({ ownerID }: { ownerID: string }) {
  try {
    await connectDB();

    const parsedID = stringToObjectId(ownerID);

    if (!parsedID) {
      return { error: "Wallet not Found" };
    }

    const wallet = await Wallet.findOne({ owner: parsedID });

    if (!wallet) return { error: "Wallet not found" };

    return wallet;
  } catch (error) {
    return error;
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

    console.log("WALLETS:",wallets);

    return { wallets };
  } catch (error) {
    return error;
  }
}
