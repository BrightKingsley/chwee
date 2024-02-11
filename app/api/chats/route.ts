import { NextResponse, NextRequest } from "next/server";

import { createChat, deleteAllChats, getChats, getUserByID } from "@/lib/db";
import { headers } from "next/headers";
import { getServerSession } from "next-auth/next";

import { getToken } from "next-auth/jwt";
import { authOptions } from "../auth/[...nextauth]/route";
import { getSession } from "next-auth/react";
import { IncomingMessage } from "http";
import { Chat, User } from "@/models";
import { stringToObjectId } from "@/lib/utils";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(request: NextRequest, response: any) {
  const res = await getChats({});

  NextResponse.json({ res });
}

type PostReq = {
  members: [string, string];
};

export async function POST(request: NextRequest) {
  try {
    const data: PostReq = await request.json();

    const members = data.members;

    if (!members) throw new Error("Invalid Members Ids");

    console.log({ members });

    const res = await createChat({ members });

    return NextResponse.json(res);
  } catch (error) {
    console.error({ error });
    return NextResponse.json(null);
  }
}

export async function DELETE() {
  try {
    const chatsDeleted = await deleteAllChats();
    if (chatsDeleted !== true)
      return NextResponse.json({
        error: { message: "Could not delete chat documents" },
      });

    return NextResponse.json({
      message: "Chat documents deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
