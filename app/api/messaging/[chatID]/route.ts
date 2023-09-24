import { pusherServer } from "@/lib/config";
import {
  sendMessage,
  getMessages,
  getGroup,
  connectDB,
  getUserByID,
  getChat,
} from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { MessageClass } from "@/models/Message";
import { Chat, Group, User, UserClass } from "@/models";
import mongoose from "mongoose";
import { stringToObjectId } from "@/lib/utils";
import { Conversation } from "@/models/Conversation";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

type PostProps = {
  params: {
    chatID: string;
  };
};

type GetProps = {
  params: {
    chatID: string;
  };
};

export async function POST(
  request: NextRequest,
  { params: { chatID } }: PostProps
) {
  try {
    await connectDB();

    const {
      message,
      roomType,
    }: { message: MessageClass; roomType: "group" | "p2p" } =
      await request.json();

    console.log("SENT_message", message);

    if (
      !message.sender ||
      (!message.textContent && message.imageContent.length < 1)
    )
      return NextResponse.json({ error: { message: "invalid message data" } });

    const parsedChatID = stringToObjectId(chatID);
    const parsedSenderID = stringToObjectId(message.sender.toString());

    if (
      !message ||
      !(message.imageContent || message.textContent) ||
      !parsedSenderID
    )
      return NextResponse.json({
        error: { message: "no message content sent" },
      });

    console.log("====REACHED-1=====");

    if (roomType === "group") {
      console.log("ROOM_TYPE", roomType);
      // Find the group by its ID
      const group = await Group.findById(parsedChatID);

      console.log("GROUP", group, parsedSenderID);

      // Check if the group exists and if the members Set includes the memberIdToCheck
      if (
        group &&
        group.members.includes(parsedSenderID || group.owner === parsedSenderID)
      ) {
        console.log("<==========REACHED=========> 2");

        pusherServer.trigger(chatID, "incoming-message", message);

        await sendMessage({ chatID, message });

        return NextResponse.json({ success: true }); // The ID exists in the members Set
      }

      return NextResponse.json({ error: { message: "Access Denied" } }); // The ID does not exist in the members Set or the group doesn't exist
    }

    if (roomType === "p2p") {
      // Find the chat by its ID
      const chat = await Chat.findById(parsedChatID);

      console.log("====REACHED-3 P2P=====");

      // Check if the chat exists and if the members Set includes the memberIdToCheck
      if (chat && chat.members.includes(parsedSenderID)) {
        const senderData: UserClass | any = await getUserByID({
          userID: parsedSenderID,
        });

        if (!senderData || senderData.error)
          return NextResponse.json({
            error: { message: "Couldnt get userData" },
          });

        pusherServer.trigger(chatID, "incoming-message", {
          ...message,
          ...senderData,
        });

        console.log("====REACHED-4 PUSHER=====");

        await sendMessage({ chatID, message });

        return NextResponse.json({ success: true }); // The ID exists in the members Set
      }

      return NextResponse.json({ error: { message: "Access Denied" } }); // The ID does not exist in the members Set or the chat doesn't exist
    }
    return NextResponse.json({ error: { message: "Access Denied" } });
  } catch (err) {
    console.log("ERROR =>", err);
    const error = err as Error;
    return NextResponse.json(error);
  }
}

export async function GET(
  request: NextRequest,
  { params: { chatID } }: GetProps
) {
  const session = await getServerSession(authOptions);

  const userID = session?.user.id;

  if (!userID)
    return NextResponse.json({ error: { message: "Access Denied" } });

  const parsedUserID = stringToObjectId(userID);
  const parsedChatID = stringToObjectId(chatID);

  if (!parsedUserID || !parsedChatID)
    return NextResponse.json({ error: { message: "Access Denied" } });

  console.log("CHAT_ID", chatID);

  const messageResult = await Conversation.findOne({ chatID });

  if (!messageResult)
    return NextResponse.json(
      { error: { message: "Conversation not found" } },
      { status: 404 }
    );
  const chatResult = await Chat.findById(parsedChatID);

  if (!chatResult?.members.includes(parsedUserID))
    if (!userID)
      return NextResponse.json(
        { error: { message: "Access Denied" } },
        {
          status: 401,
        }
      );

  const messages = await Promise.all(
    messageResult.messages.map(async (message) => {
      const senderUserID = message.sender;
      const mine = "123";
      const senderData = await User.findById(senderUserID);
      return {
        messageData: message,
        senderData,
      };
    })
  );

  if (!messages)
    return { error: { message: "Could not get messages for this chat" } };

  console.log("API_messageS", messageResult, messages);

  return NextResponse.json({ messages });
}
