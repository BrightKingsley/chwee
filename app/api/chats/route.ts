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
  try {
    //  const serverToken = await getToken({req:request, secret})
    const headersList = headers();
    const myID = headersList.get("user_id");

    if (!myID)
      return NextResponse.json({
        error: { message: "Acces Denied. Unauthenticated" },
      });

    const myParsedID = stringToObjectId(myID);

    if (!myParsedID)
      return NextResponse.json({
        error: { message: "Acces Denied. Unauthenticated" },
      });

    // if (!myID)
    //
    const chats = await Chat.find();

    console.log("CHATSSS=>", chats);

    const chatsWithUserData = await Promise.all(
      chats.map(async (chat) => {
        const memberUserID = chat.members.find((id) => {
          console.log("ID_TO_STR", id);
          return id?.toString() !== myParsedID?.toString();
        });
        console.log("MEMBERS___", {
          members: chat.members,
          myParsedID,
          memberUserID,
        });
        const mine = "123";
        const arr = ["123", "456"];
        console.log(
          "MINE===>",
          arr.find((id) => id !== mine)
        );
        const memberUserData = await User.findById(memberUserID);
        return {
          chatData: chat,
          memberUserData,
        };
      })
    );

    if (!chats || !chatsWithUserData)
      return NextResponse.json({ error: "Couldnt get Chats" });

    return NextResponse.json(chatsWithUserData);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error });
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
    return { error };
  }
}
