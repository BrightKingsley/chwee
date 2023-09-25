import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { stringToObjectId } from "@/lib/utils";
import { Transaction, Wallet } from "@/models";

type PostProps = {
  action: "fund" | "transfer" | "withdraw";
  amount?: number;
};

export async function POST(request: NextRequest) {
  try {
    const res: PostProps = await request.json();
    const { action } = res;

    console.log("RES", res);
    // const token = await getToken({ req: request, secret });

    const session = await getServerSession(authOptions);

    console.log("POST_WALLET_SESSION", session);

    const userID = session?.user.id;
    if (!userID)
      return NextResponse.json({
        error: { message: "Unauthenticated (USerID)" },
      });

    const parsedUserID = stringToObjectId(userID);

    if (!parsedUserID)
      return NextResponse.json({
        error: { message: "Unauthenticated (parsedUserID)" },
      });

    if (action === "fund") {
      const { amount } = res;
      if (!amount)
        return NextResponse.json({
          error: { message: "Please enter a valid amount" },
        });

      console.log("ABOUT_TO_FUND");
      const wallet = await Wallet.findOne({
        owner: parsedUserID,
      });
      if (!wallet)
        return NextResponse.json({
          error: {
            message: "Could not retreive wallet",
          },
        });

      //TODO: use CORRECT bank details with user details or something here
      const transaction = await Transaction.create({
        sender: parsedUserID,
        receiver: wallet._id,
        amount,
        date: new Date(),
        type: "deposit",
      });

      wallet.balance += amount;
      wallet.transactions.push(transaction._id);
      wallet.save();

      console.log("FUNDED_WALLET", wallet);

      if (!wallet)
        return NextResponse.json({
          error: { message: "Invalid Amount (AMOUNT)" },
        });

      return NextResponse.json({ message: "success" });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "an error occured" });
  }
}