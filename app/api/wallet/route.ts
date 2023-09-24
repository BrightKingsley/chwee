import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";
import { Wallet } from "@/models";
import { getToken } from "next-auth/jwt";
import { getWallet, getWallets } from "@/lib/db";
import { verifyJwt } from "@/lib/jwt";
import { stringToObjectId } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const secret = process.env.NEXTAUTH_SECRET;

type Props = {
  params: {
    userID: string;
  };
};

// export async function GET(request: Request, {params:{userID}}:Props) {
export async function GET(request: NextRequest) {
  console.log(
    "COOKIES: ",
    request.cookies.get("next-auth.session-token")?.value,
    request.headers.get("user_id")
  );
  // const tokenString = request.cookies.get("next-auth.session-token")?.value;

  // if (!tokenString)
  //   return NextResponse.json({ error: { message: "Unauthorized" } });

  const userID = request.headers.get("user_id");
  if (!userID) return NextResponse.json({ error: { message: "Unauthorized" } });
  /*
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  console.log("token from WALLET REQUEST:", { token });

  if (!token) {
    // User is not authenticated, return an error
    NextResponse.json(
      { error: "Unauthorized" },
      {
        status: 401,
      }
    );
  }
  // const userID = token?.id;
  const userID = token?.id;

  */

  if (!userID) return NextResponse.json({ error: "Invalid UserID" });
  // Find the wallet data associated with the user
  const wallet = await getWallet({ ownerID: userID as string });

  console.log("OWNER's WALLET", wallet);

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
  return NextResponse.json(wallet, {
    status: 200,
  });
}
