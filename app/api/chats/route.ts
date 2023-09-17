import { NextResponse, NextRequest } from "next/server";

import { deleteAllChats, getChats } from "@/lib/db";

export async function GET() {
  try {
    const chats = await getChats();

    if (!chats) return NextResponse.json({ error: "Couldnt get Chats" });

    return NextResponse.json(chats);
  } catch (error) {
    return NextResponse.json({ error: "Server Error" });
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
