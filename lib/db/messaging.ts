import { MessageClass } from "@/models/Message";
import connectDB from "./connect-db";
import { Group, User } from "@/models";
import { Chat } from "@/models/Chat";
import { GroupClass } from "@/models/Group";
import { Conversation, ConversationClass } from "@/models/Conversation";
import { stringToObjectId } from "../utils";
import { ClientUser } from "@/types/models";
import { pusherServer } from "../config";

export async function sendMessage({
  chatID,
  message,
  senderInfo = {},
}: {
  chatID: string;
  message: MessageClass;
  senderInfo?: {
    username?: string;
    id?: string;
    tag?: string;
    photo?: string;
  };
}) {
  try {
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

    await connectDB();

    const parsedChatID = stringToObjectId(chatID);

    console.log("SEND_MESSAGE_FUNC", message);

    const updatedConversation = await Conversation.findOneAndUpdate(
      { chatID: parsedChatID },
      {
        $push: {
          messages: message,
        },
      },
      {
        new: true, // Return the updated document
      }
    );

    if (!updatedConversation) return null;

    return updatedConversation;
  } catch (err) {
    console.error(err);
    const error = err as Error;
    return { error };
  }
}

export async function getMessages({
  chatID,
  userID,
  roomType,
}: {
  chatID: string;
  userID: string;
  roomType: "group" | "p2p";
}): Promise<ConversationClass | any> {
  try {
    const parsedUserID = stringToObjectId(userID);
    const parsedChatID = stringToObjectId(chatID);

    const userDoc = await User.findById(parsedUserID);

    if (!parsedUserID || !parsedChatID || !userDoc)
      throw new Error("Access Denied");

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

    return messages;
  } catch (error) {
    console.error(error);
    return null;
  }
}
