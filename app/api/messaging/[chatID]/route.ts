import { pusherServer } from "@/lib/config";
import {
  sendMessage,
  getMessages,
  getGroupByID,
  connectDB,
  getUserByID,
  getChat,
  transferToChweeWallet,
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

    const senderDoc = await getUserByID({ userID: parsedSenderID });

    if (!senderDoc) throw new Error("Couldn't retrieve sender document");

    let group;
    let chat;
    if (roomType === "group") {
      console.log("ROOM_TYPE", roomType);
      // Find the group by its ID
      group = await Group.findById(parsedChatID);

      console.log("GROUP", group, parsedSenderID);

      // Check if the group exists and if the members Set includes the memberIdToCheck
      if (
        !group ||
        !senderDoc.groups
          .map((groupID) => groupID.toString())
          .includes(group._id.toString())
      )
        throw new Error("Group not found or User Unauthorized");
    }
    if (roomType === "p2p") {
      chat = await Chat.findById(parsedChatID);

      console.log("====REACHED-3 P2P=====");

      if (message.funds) {
        const {} = message;
        transferToChweeWallet({
          amount: message.funds.amount,
          receiverTag: message.funds.receiver,
          senderID: message.sender.toString(),
        });
      }

      // Check if the chat exists and if the members Set includes the memberIdToCheck
      if (
        !chat ||
        !chat.members
          .map((memberID) => memberID.toString())
          .includes(message.sender.toString())
      )
        throw new Error("Group not found or User Unauthorized");
    }

    const senderInfo = {
      username: senderDoc.username,
      id: senderDoc._id,
      tag: senderDoc.tag,
      photo: senderDoc.photo,
    };

    console.log("<==========REACHED=========> 2");
    if (process.env.NODE_ENV === "production") {
      await pusherServer.trigger(chatID, "incoming-message", {
        message,
        senderInfo,
      });
    } else {
      pusherServer.trigger(chatID, "incoming-message", {
        message,
        senderInfo,
      });
    }

    await sendMessage({ chatID, message });

    return NextResponse.json({ success: true }); // The ID exists in
  } catch (error) {
    console.error({ error });
    return NextResponse.json(null);
  }
}

export async function GET(
  request: NextRequest,
  { params: { chatID } }: GetProps
) {
  try {
    const session = await getServerSession(authOptions);
    const userID = session?.user.id;

    if (!userID)
      return NextResponse.json({ error: { message: "Access Denied" } });

    const { searchParams } = new URL(request.url);

    const roomType = searchParams.get("roomType") as "group" | "p2p" | null;

    console.log({ roomType });

    if (!roomType || !(roomType === "group" || roomType === "p2p"))
      throw new Error("Invalid RoomType");

    const parsedUserID = stringToObjectId(userID);
    const parsedChatID = stringToObjectId(chatID);

    const userDoc = await User.findById(parsedUserID);

    if (!parsedUserID || !parsedChatID || !userDoc)
      return NextResponse.json({ error: { message: "Access Denied" } });

    console.log("CHAT_ID", chatID);

    if (roomType === "p2p") {
      const chatDoc = await Chat.findById(parsedChatID);
      if (!chatDoc) throw new Error("Chat document not found");
      if (!chatDoc.members.map((chat) => chat.toString()).includes(userID))
        throw new Error("User Unauthorized");
    } else {
      if (!userDoc.groups.map((group) => group.toString()).includes(chatID))
        throw new Error("User Unauthorized");
    }
    // if (
    //   !userDoc.chats.map((chat) => chat.toString()).includes(chatID) &&
    //   !userDoc.groups.map((group) => group.toString()).includes(chatID)
    // )
    //   throw new Error("User Unauthorized");

    const messageResult = await Conversation.findOne({ chatID });
    if (!messageResult) throw new Error("Conversation not found");

    const messages = await Promise.all(
      messageResult.messages.map(async (message) => {
        console.log("MESSAGE_RESULT- message", message);
        const senderUserID = message.sender;
        const senderDoc = await User.findById(senderUserID);

        if (!senderDoc) throw new Error("Couldn't retrieve sender document");

        const senderInfo = {
          username: senderDoc.username,
          tag: senderDoc.tag,
          photo: senderDoc.photo,
        };

        console.log("COMBINED: ", {
          message,
          senderInfo,
        });

        return {
          message,
          senderInfo,
        };
      })
    );

    if (!messages) throw new Error("Could not get messages for this chat");

    console.log("API_messageS", messageResult, messages);

    return NextResponse.json({ messages });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: { message: "An internal error occured" },
    });
  }
}
