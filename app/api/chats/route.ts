import { NextResponse, NextRequest } from "next/server";

import { deleteAllChats, getChats, getUserByID } from "@/lib/db";
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
