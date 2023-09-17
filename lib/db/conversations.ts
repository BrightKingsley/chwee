import { Conversation, ConversationClass } from "@/models/Conversation";
import connectDB from "./connect-db";
import { stringToObjectId } from "../utils";
import { MessageClass } from "@/models/Message";
import mongoose from "mongoose";

export async function createConversation({
  chatID,
}: {
  chatID: mongoose.Types.ObjectId | string;
}): Promise<ConversationClass | unknown> {
  try {
    await connectDB();

    const conversation = await Conversation.create({ chatID });

    console.log("Conversation Created");

    if (!conversation) return null;

    return conversation;
  } catch (err) {
    const error: any = err;
    return { error };
  }
}

export async function getConversation({
  conversationID,
}: {
  conversationID: string;
}) {
  try {
    await connectDB();

    const parsedID = stringToObjectId(conversationID);

    const conversation = await Conversation.findById(parsedID);

    if (conversation)
      return { error: { message: "Could not get Conversation With that ID" } };

    return conversation;
  } catch (error) {
    return { error };
  }
}

export async function deleteConversation({
  conversationID,
}: {
  conversationID: string;
}) {
  try {
    await connectDB();

    const parsedID = stringToObjectId(conversationID);

    await Conversation.findByIdAndDelete(parsedID);
    return true;
  } catch (error) {
    return { error };
  }
}

export async function addMessageToConversation({
  conversationID,
  message,
}: {
  conversationID: string;
  message: MessageClass;
}) {
  try {
    await connectDB();

    const parsedID = stringToObjectId(conversationID);

    const conversation = await Conversation.findByIdAndUpdate(parsedID, {
      $push: message,
    });

    if (!conversation)
      return { error: { message: "Could not update conversation" } };

    return conversation;
  } catch (error) {
    return { error };
  }
}
