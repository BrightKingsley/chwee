import { pusherServer } from "@/lib/config";
import {
  sendMessage,
  getMessages,
  getGroupByID,
  connectDB,
  getUserByID,
  getChat,
  transferToChweeWallet,
  addReaction,
} from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { MessageClass } from "@/models/Message";
import { Chat, Group, User, UserClass } from "@/models";
import mongoose from "mongoose";
import { decodeTextContent, stringToObjectId } from "@/lib/utils";
import { Conversation } from "@/models/Conversation";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { textCode } from "@/constants/utils";

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
  console.log("REACHED");
  try {
    const serverSession = await getServerSession(authOptions);
    if (!serverSession || !serverSession.user || !serverSession.user.id)
      throw new Error("Unauthenticated User!");
    const senderID = serverSession.user.id;

    const {
      message: msg,
      roomType,
    }: { message: MessageClass; roomType: "group" | "p2p" } =
      await request.json();

    const message: MessageClass = {
      ...msg,
      replyTo: msg.replyTo
        ? {
            ...msg.replyTo,
            textContent: msg.replyTo.textContent
              ? decodeTextContent(msg.replyTo.textContent)
              : undefined,
          }
        : undefined,
      sender: senderID,
    };

    console.log("SENT_MESSAGE", { message, roomType });

    if (roomType !== "group" && roomType !== "p2p")
      throw new Error("Invalid Room Type");

    if (
      !(
        message.type === "conversation" ||
        message.type === "fund" ||
        message.type === "notification"
      )
    )
      throw new Error("Invalid Message Type");

    if (message.type === "conversation") {
      if (
        !senderID ||
        (!message.textContent &&
          (!message.imageContent ||
            (message.imageContent && message.imageContent.length < 1)))
      )
        return NextResponse.json({
          error: { message: "invalid message data" },
        });
    }

    const parsedChatID = stringToObjectId(chatID);
    const parsedSenderID = stringToObjectId(senderID);

    if (!parsedSenderID)
      return NextResponse.json({
        error: { message: "Invalid sender" },
      });

    const senderDoc = await getUserByID({ userID: parsedSenderID });

    if (!senderDoc) throw new Error("Couldn't retrieve sender document");

    const senderInfo = {
      username: senderDoc.username,
      id: senderDoc._id,
      tag: senderDoc.tag,
      photo: senderDoc.photo,
    };

    if (message.type === "fund") {
      const transaction = message.transaction;
      if (!transaction) {
        throw new Error("Invalid tranaction data");
      }

      if (transaction.type === "send") {
        if (roomType === "p2p") {
          const chatDoc = await Chat.findById(parsedChatID);
          if (!chatDoc) throw new Error("Couldn't retrieve chat document");
          const receiverID = chatDoc.members.filter(
            (member) => member.toString() !== senderID
          )[0];
          if (!receiverID) throw new Error("Receiver does'nt exist");

          const receiverDoc = await User.findById(receiverID);
          if (!receiverDoc) throw new Error("Couldn't get reciver doc exist");

          const transferResult = await transferToChweeWallet({
            amount: transaction.amount,
            // receiverTag: transaction.receiver,
            receiverID,
            senderID,
          });
          if (transferResult !== "success")
            return NextResponse.json({ message: transferResult });
          const transactionMessage: MessageClass = {
            ...message,
            textContent: `${senderInfo.tag} sent ₦${transaction.amount} to ${receiverDoc.tag}${textCode}${receiverDoc.username}:${receiverDoc.tag}`,
          };
          const messageResult = await sendMessage({
            chatID,
            message: transactionMessage,
            senderInfo,
          });
          return NextResponse.json({ message: messageResult });
        } else if (roomType === "group") {
          const receiverDoc = await User.findOne({ tag: transaction.receiver });
          if (!receiverDoc) throw new Error("Invalid receiver");
          if (
            !receiverDoc.groups
              .map((group) => group.toString())
              .includes(chatID)
          )
            throw new Error("Receiver is not a member of this Group");
          const transferResult = await transferToChweeWallet({
            amount: transaction.amount,
            // receiverTag: transaction.receiver,
            receiverID: receiverDoc._id,
            senderID,
          });
          if (transferResult !== "success")
            return NextResponse.json({ message: transferResult });
          const transactionMessage: MessageClass = {
            ...message,
            textContent: `${senderInfo.tag} sent ₦${transaction.amount} to ${receiverDoc.tag}${textCode}${receiverDoc.username}:${receiverDoc.tag}`,
          };
          const messageResult = await sendMessage({
            chatID,
            message: transactionMessage,
            senderInfo,
          });
          return NextResponse.json({ message: messageResult });
        } else {
          throw new Error("Invalid Room Type");
        }
      } else if (transaction.type === "request") {
        const transactionMessage: MessageClass = {
          ...message,
          textContent: `${senderInfo.tag} requested for ₦${transaction.amount}${textCode}${senderInfo.username}:${senderInfo.tag}`,
        };
        const messageResult = await sendMessage({
          chatID,
          message: transactionMessage,
          senderInfo,
        });
        return NextResponse.json({ message: messageResult });
      } else {
        throw new Error("Invalid Transaction Type");
      }
    } else if (message.type === "conversation") {
      let group;
      let chat;
      await connectDB();
      if (roomType === "group") {
        // Find the group by its ID
        group = await Group.findById(parsedChatID);

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

        // Check if the chat exists and if the members Set includes the memberIdToCheck
        if (
          !chat ||
          !chat.members
            .map((memberID) => memberID.toString())
            .includes(senderID.toString())
        )
          throw new Error("Group not found or User Unauthorized");
      }

      const result = await sendMessage({ chatID, message, senderInfo });

      return NextResponse.json({ message: result }); // The ID exists in
    } else {
      throw new Error("Invalid Message Type");
    }
  } catch (error) {
    console.error({ error });
    return NextResponse.json(null);
  }
}

const MAX_MESSAGES = 14;
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

    if (!roomType || !(roomType === "group" || roomType === "p2p"))
      throw new Error("Invalid RoomType");

    const parsedUserID = stringToObjectId(userID);
    const parsedChatID = stringToObjectId(chatID);

    const userDoc = await User.findById(parsedUserID);

    if (!parsedUserID || !parsedChatID || !userDoc)
      return NextResponse.json({ error: { message: "Access Denied" } });

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

    /*  const messages = await Promise.all(
      Object.values(messageResult.messages).map(async (message) => {
        const senderUserID = message.sender;
        const senderDoc = await User.findById(senderUserID);

        if (!senderDoc) throw new Error("Couldn't retrieve sender document");

        const senderInfo = {
          username: senderDoc.username,
          tag: senderDoc.tag,
          photo: senderDoc.photo,
        };

        return {
          message,
          senderInfo,
        };
      })
    );
    */

    // To implement some form of pagination to fetch only the first {MAX_MESSAGES} number of messages, get the sender info of each message and return an array of messages alongside the sender info
    // let messages = [];
    let messages = await getMaxMessages(messageResult.messages);

    console.log({ length: messages.length, messages });

    // Get a list of sender IDs equal in length to the number of retrieved messages. This is done this way, and not put in a loop as written ealier in the code commented-out above to prevent multiple queries to the database
    /*
    console.log("ALREADY GETTING UIDs");
    const senderUserIDs = messagesArray.map((message) => message.sender);
    console.log({ senderUserIDs });

    const senderDocs = await User.find({ _id: { $in: senderUserIDs } });
    console.log({ length: senderDocs.length, senderDocs });
    */

    // Here, the gotten sender docs are put togetjer in an object with their respective message document
    /* messages = messagesArray.map((message, i) => {
      console.log("SENDER_DOC", senderDocs[i], senderDocs[i].username);
      return {
        message,
        senderInfo: {
          username: senderDocs[i].username,
          tag: senderDocs[i].tag,
          photo: senderDocs[i].photo,
        },
      };
    });
    */

    if (!messages) throw new Error("Could not get messages for this chat");
    return NextResponse.json({ messages });
  } catch (error) {
    console.error({ error });
    return NextResponse.json({
      error: { message: "An internal error occured" },
    });
  }
}

export async function PATCH(
  request: NextRequest,
  { params: { chatID } }: PostProps
) {
  try {
    const serverSession = await getServerSession(authOptions);
    if (!serverSession || !serverSession.user || !serverSession.user.id)
      throw new Error("Unauthenticated User!");
    const senderID = serverSession.user.id;

    const { messageID, reaction }: { messageID: string; reaction: string } =
      await request.json();
    if (
      !messageID ||
      !reaction ||
      typeof messageID !== "string" ||
      typeof reaction !== "string"
    )
      throw new Error("Invalid Data");
    const result = await addReaction({ chatID, messageID, reaction, senderID });
    return NextResponse.json(result);
  } catch (error) {
    console.error({ error });
    return NextResponse.json(null);
  }
}

export async function PUT() {
  return NextResponse.json("happy");
}

async function getMaxMessages(obj: { [key: string]: any }) {
  let array = [];
  let count = 0;
  let queryCount = 0;
  const cachedUsers: { [key: string]: any } = {};

  for (const key in obj) {
    if (count >= MAX_MESSAGES) {
      break;
    }

    const message = obj[key];

    const senderUserID = message.sender;

    let senderDoc;
    if (cachedUsers[senderUserID]) {
      senderDoc = cachedUsers[senderUserID];
    } else {
      senderDoc = await User.findById(senderUserID);
      cachedUsers[senderUserID] = senderDoc;
      queryCount++;
    }

    if (!senderDoc) throw new Error("Couldn't retrieve sender document");

    const senderInfo = {
      username: senderDoc.username,
      tag: senderDoc.tag,
      photo: senderDoc.photo,
    };

    array.push({ message, senderInfo });
    count++;
  }
  console.log({ queryCount });
  return array;
}
