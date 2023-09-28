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
    const userID = headersList.get("user_id");

    if (!userID)
      return NextResponse.json({
        error: { message: "Acces Denied. Unauthenticated" },
      });

    const parsedUserID = stringToObjectId(userID);

    if (!parsedUserID)
      return NextResponse.json({
        error: { message: "Acces Denied. Unauthenticated" },
      });

    // if (!userID)
    //
    const user = await User.findById(parsedUserID);

    console.log("USER_FROM_CHATS", user);

    if (!user) throw new Error("User not found");
    // return NextResponse.json({
    //   error: { message: "Acces Denied. Unauthenticated" },
    // });

    const chatsWithUserData = await Promise.all(
      user.chats.map(async (userChat) => {
        const chat = await Chat.findById(userChat);
        if (!chat) throw new Error("Chat unavailable");
        const memberUserID = chat.members.find((id) => {
          return id?.toString() !== parsedUserID?.toString();
        });
        console.log("MEMBERS___", {
          members: chat.members,
          parsedUserID,
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

    if (!chatsWithUserData)
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
