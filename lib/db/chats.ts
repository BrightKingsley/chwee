// Import necessary modules and dependencies
import { Chat, User } from "@/models";
import connectDB from "./connect-db";
import { generatePassword, stringToObjectId } from "../utils";
import { ChatClass } from "@/models/Chat";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { createConversation } from ".";
import { ConversationClass } from "@/models/Conversation";

// Define the number of salt rounds for password hashing
const saltRounds = 10;

/**
 * Create a new chat.
 *
 * @param {object} chatData - Chat creation data.
 * @param {string} chatData.ownerID - ID of the chat owner.
 * @param {string} chatData.name - Chat name.
 * @param {string} chatData.description - Chat description.
 * @param {boolean} chatData.password - Whether the chat requires a password.
 * @returns {Promise<object>} - A new chat or an error object.
 */
export async function createChat({ members }: { members: string[] }) {
  try {
    // Connect to the database
    await connectDB();

    // Parse the owner's ID
    const parsedIDs = members.map((memberID) => stringToObjectId(memberID));

    // Create the chat without a password
    const chat = await Chat.create({
      members: parsedIDs,
    });

    if (!chat) return null;

    // Create a conversation for the chat
    const conversation: ConversationClass | any = await createConversation({
      chatID: chat._id,
    });

    // Check if the conversation was created successfully
    if (!conversation.id)
      return { error: { message: "Couldn't Create Chat Conversation" } };

    console.log("CREATED_CONVO", conversation);

    parsedIDs.forEach(async (id) => {
      const updatedUser = await User.findByIdAndUpdate(id, {
        $push: {
          chats: id,
        },
      });
      console.log("UPDATED USER", updatedUser);
      updatedUser?.save();
    });

    return { chat };
  } catch (error) {
    return { error } as any;
  }
}

/**
 * Get a chat by its ID.
 *
 * @param {object} query - Query parameters.
 * @param {string} query.chatID - ID of the chat to retrieve.
 * @param {string} query.password - Password for accessing a password-protected chat.
 * @returns {Promise<object>} - The requested chat or an error object.
 */
export async function getChat({
  chatID,
  password,
}: {
  chatID: string;
  password?: string;
}) {
  try {
    // Connect to the database
    await connectDB();

    // Parse the chat's ID
    const parsedID = stringToObjectId(chatID);

    console.log("parsedID", parsedID);

    // Check if the chat's ID is valid
    if (!parsedID) {
      return { error: "Chat not Found" };
    }

    // Find the chat by its ID
    const chat = await Chat.findById(parsedID);

    console.log("FOUND_GROUP", chat);

    // If the chat is not found, return an error
    if (!chat) return null;

    if (chat) {
      if (chat.password) {
        console.log("password available");

        // Check if a password is provided and compare it with the hashed password
        if (!password) return { error: { message: "Password Incorrect" } };

        const match = await bcrypt.compare(password, chat.password);

        console.log("GROUP PASS MATCH:", match);

        return match
          ? { chat, password }
          : { error: { message: "Password Incorrect" } };
      }
    }

    return chat;
  } catch (error) {
    return { error };
  }
}

/**
 * Delete a chat by its ID.
 *
 * @param {object} params - Parameters for chat deletion.
 * @param {string} params.chatID - ID of the chat to delete.
 * @returns {Promise<boolean | object>} - True if deletion is successful or an error object.
 */
export async function deleteChat({ chatID }: { chatID: string }) {
  try {
    // Connect to the database
    await connectDB();

    // Find and delete the chat by its ID
    await Chat.findByIdAndDelete(chatID);

    return true;
  } catch (error: any) {
    return { error };
  }
}

/**
 * Delete all chats.
 *
 * @returns {Promise<boolean | object>} - True if deletion is successful or an error object.
 */
export async function deleteAllChats() {
  try {
    // Connect to the database
    await connectDB();

    // Delete all chats
    await Chat.deleteMany();
    return true;
  } catch (error: any) {
    return { error };
  }
}

// Define a filter interface for chat retrieval
interface ChatFilter {
  page?: number;
  limit?: number;
}

/**
 * Get a list of chats with optional pagination.
 *
 * @param {ChatFilter} filter - Filtering and pagination options.
 * @returns {Promise<object>} - An array of chats or an error object.
 */
export async function getChats(filter: ChatFilter = {}) {
  try {
    // Connect to the database
    await connectDB();

    console.log("REACHED");

    // Extract filtering and pagination options
    const page = filter.page ?? 1;
    const limit = filter.limit ?? 10;
    const skip = (page - 1) * limit;

    // Find and retrieve chats with optional pagination
    const chats = await Chat.find().skip(skip).limit(limit).lean().exec();

    console.log("WALLETS:", chats);

    return chats;
  } catch (error) {
    return { error };
  }
}

/**
 * Add a member to a chat by chat name.
 *
 * @param {object} params - Parameters for adding a member to a chat.
 * @param {string} params.name - Chat name.
 * @param {string} params.userID - ID of the user to add to the chat.
 * @returns {Promise<object>} - The updated chat or an error object.
 */
export async function addMemberToChat({
  name,
  userID,
}: {
  name: string;
  userID: string;
}) {
  try {
    // Connect to the database
    await connectDB();

    // Parse the user's ID
    const parsedID = stringToObjectId(userID);

    if (!parsedID) return { error: { message: "Invalid User Id" } };

    // Find the chat by name and add the user as a member
    const chat = await Chat.findOneAndUpdate(
      {
        name,
      },
      { $push: { members: parsedID } }
    );

    return chat;
  } catch (error) {
    return { error };
  }
}
