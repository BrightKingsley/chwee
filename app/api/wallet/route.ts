import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";
import { Wallet } from "@/models";
import {getToken} from "next-auth/jwt";
import { getWallet, getWallets } from "@/lib/db";

type Props = {
  params: {
    userID: string;
  };
};

// export async function GET(request: Request, {params:{userID}}:Props) {
export async function GET(request:NextRequest) {
  // const token = await getSession({ req: request });

  // console.log(
  //   "COOKIES: ",
  //   request.cookies.get("next-auth.session-token")?.value
  // );

 const token = await getToken({req:request,secret:process.env.NEXTAUTH_SECRET})

console.log("token from REQUEST:",token)

  if (!token) {
    // User is not authenticated, return an error
    NextResponse.json(
      { error: "Unauthorized" },
      {
        status: 401,
      }
    );
  }
  // const userId = token?.id;
  const userId = token?.id;

  if (!userId) return NextResponse.json({ error: "Invalid UserID" });
  // Find the wallet data associated with the user
  const wallet = await getWallet({ ownerID: userId as string });

  console.log("OWNER's WALLET", wallet)

  if (!wallet) {
    // Wallet not found, return an error
    return NextResponse.json(
      { error: "Wallet not found" },
      {
        status: 404,
      }
    );
  }

  // Return the wallet data
  return NextResponse.json(
    { wallet },
    {
      status: 200,
    }
  );
}

export async function PUT() {
  try {
    const walletsList = await getWallets();

    console.log("WALLETS_LIST", walletsList);

    return NextResponse.json(walletsList);
  } catch (error) {
    return NextResponse.json({ error: "an error occured" });
  }
}
