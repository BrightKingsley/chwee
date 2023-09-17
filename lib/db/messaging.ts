import { MessageClass } from "@/models/Message";
import connectDB from "./connect-db";
import { Group } from "@/models";
import { Chat } from "@/models/Chat";
import { GroupClass } from "@/models/Group";
import { Conversation, ConversationClass } from "@/models/Conversation";

export async function sendMessage({
  chatID,
  message,
}: {
  chatID: string;
  message: MessageClass;
}) {
  try {
    await connectDB();


    console.log("SEND_MESSAGE_FUNC", message)


    const updatedConversation = await Conversation.findOneAndUpdate(
      { chatID },
      {
        $push: {
          messages: message,
        },
      },
      {
        new: true, // Return the updated document
        upsert: true, // Create the conversation if it doesn't exist
      }
    );

    console.log("UPDATED_CONVO", updatedConversation);

    if (!updatedConversation) return null;

    return updatedConversation;
  } catch (err) {
    const error = err as Error;
    return { error };
  }
}

export async function getMessages({
  chatID,
}: {
  chatID: string;
}):Promise<ConversationClass | any> {
  try {
    await connectDB();

    const conversation = await Conversation.findOne({ chatID });
    if (!conversation) return null;

    console.log("GET_CONVOS_FUNC", conversation)

    return conversation
  } catch (error) {
    return {error}
  }
}
