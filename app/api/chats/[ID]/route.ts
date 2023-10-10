import { NextResponse, NextRequest } from "next/server";

import { getChat, createChat, deleteChat } from "@/lib/db";

type GetProps = {
  params: {
    ID: string;
  };
};

//pass 281019512623462
export async function GET(request: NextRequest, { params: { ID } }: GetProps) {
  try {
    const { searchParams } = new URL(request.url);

    const password = searchParams.get("password");

    // const {password} = await request.json()
    const chat: any = await getChat({
      chatID: ID,
      password: password ? password : undefined,
    });

    console.log("CHAT", chat);

    if (!chat)
      return NextResponse.json({ error: { message: "Couldnt get Chats" } });

    if (chat.error) return NextResponse.json({ ...chat.error });

    return NextResponse.json({ chat });
  } catch (error) {
    console.log("ERROR", error);
    return NextResponse.json({ error });
  }
}

type PostProps = {
  params: {
    ID: string;
  };
};

// TODO check and remove/Keep this route
export async function POST(
  request: NextRequest,
  { params: { ID: senderID } }: PostProps
) {
  try {
    const { receiver } = await request.json();

    const members = [senderID, receiver];

    if (!senderID || !receiver)
      throw new Error(`invalid sender ${senderID} OR receiver ${receiver}`);

    console.log("CREATE_CHAT-data", members);

    if (members.length < 2)
      return NextResponse.json({
        error: {
          message: "Please Provide a name and description for the chat",
        },
      });

    const chat = await createChat({
      members,
    });
    if (!chat)
      return NextResponse.json({ error: { message: "Couldnt Create Chats" } });

    return NextResponse.json(chat);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error });
  }
}

export async function DELETE(
  request: NextRequest,
  { params: { ID } }: PostProps
) {
  try {
    const { name, id } = await request.json();

    console.log("NAME__ID", name, id);

    if (!(name && id))
      return NextResponse.json({
        error: {
          message: "Please Provide a Name and Chat ID",
        },
      });

    const chatDeleted = await deleteChat({ chatID: id });

    console.log("CHAT", chatDeleted);

    if (chatDeleted !== true)
      return NextResponse.json({ error: { message: "Couldn't Delete Chat" } });

    return NextResponse.json({
      success: {
        message: "Deleted Successfully",
      },
    });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
