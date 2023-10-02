// Import necessary modules and dependencies
import { Group } from "@/models";
import connectDB from "./connect-db";
import { generatePassword, stringToObjectId } from "../utils";
import { GroupClass } from "@/models/Group";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { createConversation } from ".";
import { ConversationClass } from "@/models/Conversation";

// Define the number of salt rounds for password hashing
const saltRounds = 10;

/**
 * Create a new group.
 *
 * @param {object} groupData - Group creation data.
 * @param {string} groupData.ownerID - ID of the group owner.
 * @param {string} groupData.name - Group name.
 * @param {string} groupData.description - Group description.
 * @param {boolean} groupData.password - Whether the group requires a password.
 * @returns {Promise<object>} - A new group or an error object.
 */
export async function createGroup({
  ownerID,
  name,
  description,
  password = false,
}: {
  ownerID: string;
  name: string;
  description: string;
  password?: boolean;
}) {
  console.log("CREATED_WALLET_OWNER", ownerID);
  try {
    // Connect to the database
    await connectDB();

    // Parse the owner's ID
    const parsedID = stringToObjectId(ownerID.trimEnd());

    if (password) {
      // Generate a random password
      const genPass = generatePassword(8);

      // Generate a salt for password hashing
      const salt = await bcrypt.genSalt(saltRounds);

      // Hash the generated password
      const hashedPassword = await bcrypt.hash(genPass, salt);

      console.log("HASHED_PASS", hashedPassword);

      // Create the group with a hashed password
      const group = await Group.create({
        owner: parsedID,
        name: name.trimEnd(),
        description: description.trimEnd(),
        password: hashedPassword,
        members: [parsedID],
      });

      if (!group) return null;

      // Create a conversation for the group
      const conversation: ConversationClass | any = await createConversation({
        chatID: group._id,
      });

      // Check if the conversation was created successfully
      if (!conversation.id)
        return { error: { message: "Couldn't Create Group Conversation" } };

      console.log("CREATED_CONVO", conversation);

      return { group, password: genPass };
    }

    // Create the group without a password
    const group = await Group.create({
      owner: parsedID,
      name: name.trimEnd(),
      description: description.trimEnd(),
      members: [parsedID],
    });

    // Create a conversation for the group
    const conversation: ConversationClass | any = await createConversation({
      chatID: group._id,
    });

    // Check if the conversation was created successfully
    if (!conversation.id)
      return { error: { message: "Couldn't Create Group Conversation" } };

    console.log("CREATED_CONVO", conversation);

    return { group };
  } catch (error) {
    return { error } as any;
  }
}

export async function getGroupInfo({ groupID }: { groupID: string }) {
  try {
    await connectDB();

    const parsedGroupID = stringToObjectId(groupID);

    const group = await Group.findById(parsedGroupID);

    if (!group) throw new Error("Group not found");

    const groupInfo = {
      name: group.name,
      description: group.description,
      photo: group.photo,
      tag: group.tag,
      membersCount: group.members.length,
      owner: group.owner.toString(),
      hasPassword: group.password.length > 0,
    };

    return groupInfo;
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * Get a group by its ID.
 *
 * @param {object} query - Query parameters.
 * @param {string} query.groupID - ID of the group to retrieve.
 * @param {string} query.password - Password for accessing a password-protected group.
 * @returns {Promise<object>} - The requested group or an error object.
 */
export async function getGroupByID({
  groupID,
  password,
}: {
  groupID: string;
  password?: string;
}) {
  try {
    // Connect to the database
    await connectDB();

    // Parse the group's ID
    const parsedID = stringToObjectId(groupID);

    console.log("parsedID", parsedID);

    // Check if the group's ID is valid
    if (!parsedID) {
      return { error: "Group not Found" };
    }

    // Find the group by its ID
    const group = await Group.findById(parsedID);

    console.log("FOUND_GROUP", group);

    // If the group is not found, return an error
    if (!group) return { error: "Group not found" };

    if (group) {
      if (group.password) {
        console.log("password available");

        // Check if a password is provided and compare it with the hashed password
        if (!password) return { error: { message: "Password Incorrect" } };

        const match = await bcrypt.compare(password, group.password);

        return match
          ? { group, password }
          : { error: { message: "Password Incorrect" } };
      }
    }

    return group;
  } catch (error) {
    return { error };
  }
}

/**
 * Delete a group by its ID.
 *
 * @param {object} params - Parameters for group deletion.
 * @param {string} params.groupID - ID of the group to delete.
 * @returns {Promise<boolean | object>} - True if deletion is successful or an error object.
 */
export async function deleteGroup({ groupID }: { groupID: string }) {
  try {
    // Connect to the database
    await connectDB();

    // Find and delete the group by its ID
    await Group.findByIdAndDelete(groupID);

    return true;
  } catch (error: any) {
    return { error };
  }
}

/**
 * Delete all groups.
 *
 * @returns {Promise<boolean | object>} - True if deletion is successful or an error object.
 */
export async function deleteAllGroups() {
  try {
    // Connect to the database
    await connectDB();

    // Delete all groups
    await Group.deleteMany();
    return true;
  } catch (error: any) {
    return { error };
  }
}

// Define a filter interface for group retrieval
interface GroupFilter {
  page?: number;
  limit?: number;
}

/**
 * Get a list of groups with optional pagination.
 *
 * @param {GroupFilter} filter - Filtering and pagination options.
 * @returns {Promise<object>} - An array of groups or an error object.
 */
export async function getGroups({ filter }: { filter?: GroupFilter }) {
  try {
    // Connect to the database
    await connectDB();

    // Extract filtering and pagination options
    const page = filter?.page ?? 1;
    const limit = filter?.limit ?? 10;
    const skip = (page - 1) * limit;

    // Find and retrieve groups with optional pagination
    const groups = await Group.find().skip(skip).limit(limit).lean().exec();

    if (!groups) throw new Error("Couldnt get Groups");

    console.log("GROUPSS:", groups);
    return groups;
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * Add a member to a group by group name.
 *
 * @param {object} params - Parameters for adding a member to a group.
 * @param {string} params.name - Group name.
 * @param {string} params.userID - ID of the user to add to the group.
 * @returns {Promise<object>} - The updated group or an error object.
 */
export async function addMemberToGroup({
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

    if (!parsedID) throw new Error("Invalid UserId");

    // Find the group by name and add the user as a member
    const group = await Group.findOneAndUpdate(
      {
        name,
      },
      { $push: { members: parsedID } }
    );

    if (!group) return null;

    return group;
  } catch (error) {
    console.error(error);
    return null;
  }
}
