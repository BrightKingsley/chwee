// Import necessary modules and dependencies
import { Group, User } from "@/models";
import connectDB from "./connect-db";
import {
  formatTag,
  generatePassword,
  lettersAndNumbersOnly,
  stringToObjectId,
} from "../utils";
import { GroupClass } from "@/models/Group";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { createConversation, sendMessage } from ".";
import { Conversation, ConversationClass } from "@/models/Conversation";
import { ClientGroup } from "@/types/models";

// Define the number of salt rounds for password hashing
const saltRounds = 10;

/**
 * Create a new group.
 *
 * @param {object} groupData - Group creation data.
 * @param {string} groupData.ownerID - ID of the group owner.
 * @param {string} groupData.name - Group name.
 * @param {string} groupData.description - Group description.
 * @param {boolean} groupData.password - Wgether the group requires a password.
 * @returns {Promise<object>} - A new group or an error object.
 */
export async function createGroup({
  ownerID,
  name,
  description,
  password = false,
  photo,
  tag,
}: {
  ownerID: string;
  name: string;
  description: string;
  password: string | boolean;
  photo: string;
  tag: string;
}) {
  console.log("CREATED_WALLET_OWNER", ownerID);
  try {
    // Connect to the database
    await connectDB();

    // Parse the owner's ID
    const parsedOwnerID = stringToObjectId(ownerID.trimEnd());

    let genPass = "";
    let hashedPassword = "";
    // if (password) {
    //   // Generate a random password
    //   genPass = generatePassword(8);

    //   // Generate a salt for password hashing
    //   const salt = await bcrypt.genSalt(saltRounds);

    //   // Hash the generated password
    //   hashedPassword = await bcrypt.hash(genPass, salt);

    //   console.log("HASHED_PASS", hashedPassword);
    // }

    if (password === false) {
      hashedPassword = "";
    } else if (password === true) {
      genPass = generatePassword(8);
      hashedPassword = await bcrypt.hash(genPass, saltRounds);
    } else if (password && password.length > 0) {
      hashedPassword = await bcrypt.hash(password, saltRounds);
    }

    // Create the group with a hashed password
    const groupDoc = await Group.create({
      owner: parsedOwnerID,
      name: name.trimEnd(),
      description: description.trimEnd(),
      password: hashedPassword,
      members: [parsedOwnerID],
      photo,
      tag: formatTag(lettersAndNumbersOnly(tag)),
    });

    if (!groupDoc) return null;

    // Create a conversation for the group
    const conversation: ConversationClass | any = await createConversation({
      chatID: groupDoc._id,
    });

    const group = {
      owner: groupDoc.owner,
      name: groupDoc.name,
      description: groupDoc.description,
      password: genPass,
      members: groupDoc.members,
      photo: groupDoc.photo,
      tag: groupDoc.tag,
    };

    // Check if the conversation was created successfully
    if (!conversation.id) throw new Error("Couldn't Create Group Conversation");

    const userDoc = await User.findOneAndUpdate(
      { _id: parsedOwnerID, groups: { $nin: [groupDoc._id] } },
      { $addToSet: { groups: groupDoc._id } },
      { new: true }
    ).exec();
    userDoc?.save;

    console.log("CREATED_CONVO", conversation);

    return group;
  } catch (error) {
    console.error({ error });
    return null;
  }
}

export async function updateGroup({
  groupID,
  userID,
  name,
  description,
  photo,
  tag,
  password,
}: {
  groupID: string;
  userID: string;
  name: string | undefined;
  description: string | undefined;
  photo: string;
  tag: string;
  password: string | boolean | undefined;
}) {
  try {
    const parsedGroupID = stringToObjectId(groupID);

    const parsedUserID = stringToObjectId(userID);

    const group = await Group.findById(parsedGroupID);
    if (!group) throw new Error("Group document not found");

    if (userID !== group.owner.toString()) return "Unauthorized operation";

    if (name) {
      group.name = name;
      sendMessage({
        chatID: group._id.toString(),
        message: {
          textContent: "An admin changed the group name to " + name,
          sender: group.owner,
          sendDate: new Date(),
          type: "notification",
        },
      });
    }

    if (description) {
      group.description = description;
      await sendMessage({
        chatID: group._id.toString(),
        message: {
          textContent: "An admin changed the group description",
          sender: group.owner,
          sendDate: new Date(),
          type: "notification",
        },
      });
    }
    if (photo) {
      group.photo = photo;
      await sendMessage({
        chatID: group._id.toString(),
        message: {
          textContent: "An admin changed the group photo",
          sender: group.owner,
          sendDate: new Date(),
          type: "notification",
        },
      });
    }
    if (tag) {
      const groupTag = formatTag(lettersAndNumbersOnly(tag));
      group.tag = groupTag;
      await sendMessage({
        chatID: group._id.toString(),
        message: {
          textContent: `An admin changed the group tag to ${groupTag}`,
          sender: group.owner,
          sendDate: new Date(),
          type: "notification",
        },
      });
    }
    if (
      password === true ||
      password === false ||
      (password && password?.length > 0)
    ) {
      if (password === false) {
        group.password = "";
      } else if (password === true) {
        const genPass = generatePassword(8);
        const hashedPassword = await bcrypt.hash(genPass, saltRounds);
        group.password = hashedPassword;
      } else if (password && password.length > 0) {
        group.password = password;
      }
    }
    group.save();
    return "group updated successfully";
  } catch (error) {
    console.error({ error });
    return null;
  }
}

export async function getGroupByID({ groupID }: { groupID: string }) {
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
      members: group.members,
      owner: group.owner.toString(),
      hasPassword: group.password.length > 0,
    };

    return groupInfo;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getGroupByTag({ tag }: { tag: string }) {
  try {
    await connectDB();

    const group = await Group.findOne({ tag });

    if (!group) throw new Error("Group not found");

    const groupInfo = {
      id: group._id.toString(),
      name: group.name,
      description: group.description,
      photo: group.photo,
      tag: group.tag,
      members: group.members,
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

/*
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
    const parsedGroupID = stringToObjectId(groupID);

    console.log("parsedGroupID", parsedGroupID);

    // Check if the group's ID is valid
    if (!parsedGroupID) throw new Error("Group not Found");

    // Find the group by its ID
    const group = await Group.findById(parsedGroupID);

    console.log("FOUND_GROUP", group);

    // If the group is not found, return an error
    if (!group) throw new Error("Group not found");

    if (group.password) {
      console.log("password available");

      // Check if a password is provided and compare it with the hashed password
      if (!password) throw new Error("Password Incorrect");

      const match = await bcrypt.compare(password, group.password);

      if (!match) throw new Error("Password Incorrect");

      return {
        group,
        password,
      };
    }

    return group;
  } catch (error) {
    console.error({ error });
    return null;
  }
}
*/

export async function exitGroup({
  userID,
  groupID,
  sessionUser,
}: {
  userID: string;
  groupID: string;
  sessionUser: string;
}) {
  try {
    const parsedUserID = stringToObjectId(userID);
    const parsedGroupID = stringToObjectId(groupID);

    if (!(parsedUserID && parsedGroupID)) return "Invalid User or group ID";

    const group = await Group.findById(parsedGroupID);
    if (!group) return "Group not found";
    if (userID != sessionUser && sessionUser != group.owner.toString())
      return "Unauthorized!";

    if (userID === sessionUser && userID === group.owner.toString())
      return "The group Owner cannot exit a group";

    const updatedGroup = await Group.findOneAndUpdate(
      { _id: parsedGroupID, members: parsedUserID }, // Check if userIdToRemove exists in connections array
      { $pull: { members: parsedUserID } }, // Remove userIdToRemove from connections
      { new: true } // Return the updated user document
    ).exec();

    const updatedUser = await User.findOneAndUpdate(
      { _id: parsedUserID, groups: parsedGroupID }, // Check if groupIdToRemove exists in groups array
      { $pull: { groups: parsedGroupID } }, // Remove groupIdToRemove from groups
      { new: true } // Return the updated user document
    ).exec();

    if (!(updatedGroup && updatedUser)) return "Couldn't exit group";

    return "exited group successfully";
  } catch (error) {
    console.error({ error });
    return null;
  }
}

/**
 * Delete a group by its ID.
 *
 * @param {object} params - Parameters for group deletion.
 * @param {string} params.groupID - ID of the group to delete.
 * @returns {Promise<boolean | object>} - True if deletion is successful or an error object.
 */
export async function deleteGroup({
  groupID,
  ownerID,
}: {
  groupID: string;
  ownerID: string;
}) {
  try {
    const parsedGroupID = stringToObjectId(groupID);
    // Connect to the database
    await connectDB();
    const groupDoc = await Group.findById(parsedGroupID);
    if (!groupDoc) throw new Error("Couldn't get Group");

    // Find the group by its ID
    if (groupDoc.owner.toString() !== ownerID) return "Unauthorized access!";
    // Find and delete the group by its ID
    // const groupDoc = await Group.findByIdAndDelete(groupID);

    const conversationDoc = await Conversation.findOneAndDelete({
      chatID: groupDoc._id,
    });
    if (!conversationDoc) throw new Error("Couldn't get Conversation Document");

    groupDoc.members.forEach(async (member) => {
      await User.findOneAndUpdate(
        { _id: member, groups: parsedGroupID }, // Check if groupIdToRemove exists in groups array
        { $pull: { groups: parsedGroupID } }, // Remove groupIdToRemove from groups
        { new: true } // Return the updated user document
      ).exec();
    });

    const deletedGroup = await groupDoc.deleteOne();

    console.log({ deletedGroup });

    return "Deleted Successfully";
  } catch (error) {
    console.error({ error });
    return null;
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
    const groupDocs = await Group.find().skip(skip).limit(limit).lean().exec();

    if (!groupDocs) throw new Error("Couldnt get Groups");

    const groups: ClientGroup[] = groupDocs.map((group) => ({
      _id: group._id.toString(),
      admins: group.admins,
      description: group.description,
      members: group.members,
      name: group.name,
      owner: group.owner.toString(),
      photo: group.photo,
      tag: group.tag,
      hasPassWord: group.password.length > 0,
    }));

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

// TODO Check if this function is really needed
export async function addMemberToGroupByTag({
  tag,
  userID,
}: {
  tag: string;
  userID: string;
}) {
  try {
    // Connect to the database
    await connectDB();

    // Parse the user's ID
    const parsedUserID = stringToObjectId(userID);

    if (!parsedUserID) throw new Error("Invalid UserId");

    // Find the group by tag and add the user as a member
    const groupDoc = await Group.findOneAndUpdate(
      {
        tag,
        members: { $nin: [parsedUserID] },
      },
      { $addToSet: { members: parsedUserID } },
      { new: true }
    ).exec();

    if (!groupDoc) throw new Error("Couldn't Update Group doc");

    const userDoc = await User.findOneAndUpdate(
      { _id: parsedUserID, groups: { $nin: [groupDoc._id] } },
      { $addToSet: { groups: groupDoc._id } },
      { new: true }
    ).exec();

    if (!userDoc) throw new Error("Couldn't Update User doc");

    console.log({ groupDoc, userDoc });

    groupDoc.save();
    userDoc.save();

    // const groupMembers = groupDoc.members;
    const group = {
      _id: groupDoc._id,
      members: groupDoc.members,
    };

    return group;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function addMemberToGroupByID({
  groupID,
  userID,
}: {
  groupID: string;
  userID: string;
}) {
  try {
    // Connect to the database
    await connectDB();

    // Parse the user's ID
    const parsedUserID = stringToObjectId(userID);
    const parsedGroupID = stringToObjectId(groupID);

    if (!parsedUserID) throw new Error("Invalid UserId");

    const groupDOcument = await Group.findById(parsedGroupID);
    const userDOcument = await User.findById(parsedUserID);
    console.log({ groupDOcument, userDOcument });

    // Find the group by groupID and add the user as a member
    const groupDoc = await Group.findOneAndUpdate(
      {
        _id: parsedGroupID,
        members: { $nin: [parsedUserID] },
      },
      { $addToSet: { members: parsedUserID } },
      { new: true }
    ).exec();
    console.log({ groupDoc });

    if (!groupDoc) throw new Error("Couldn't Update Group doc");

    const userDoc = await User.findOneAndUpdate(
      { _id: parsedUserID, groups: { $nin: [groupDoc._id] } },
      { $addToSet: { groups: groupDoc._id } },
      { new: true }
    ).exec();

    console.log({ groupDoc, userDoc });
    if (!userDoc) throw new Error("Couldn't Update User doc");

    groupDoc.save();
    userDoc.save();

    // const groupMembers = groupDoc.members;

    const group = {
      _id: groupDoc._id,
      members: groupDoc.members,
    };

    return group;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function requestMembership({
  groupID,
  userID,
}: {
  groupID: string;
  userID: string;
}) {
  try {
    // Connect to the database
    await connectDB();

    // Parse the user's ID
    const parsedUserID = stringToObjectId(userID);
    const parsedGroupID = stringToObjectId(groupID);

    if (!parsedUserID) throw new Error("Invalid UserId");

    // Find the group by groupID and add the user as a member
    const groupDoc = await Group.findOneAndUpdate(
      {
        _id: parsedGroupID,
        members: { $nin: [parsedUserID] },
        joinRequests: { $nin: [parsedUserID] },
      },
      { $addToSet: { joinRequests: parsedUserID } },
      { new: true }
    ).exec();

    if (!groupDoc) throw new Error("Couldn't Update Group doc");

    const userDoc = await User.findOneAndUpdate(
      {
        _id: parsedUserID,
        groups: { $nin: [groupDoc._id] },
        groupsRequested: { $nin: [groupDoc._id] },
      },
      { $addToSet: { groupsRequested: groupDoc._id } },
      { new: true }
    ).exec();

    if (!userDoc) throw new Error("Couldn't Update User doc");

    console.log({ groupDoc, userDoc });

    groupDoc.save();
    userDoc.save();

    return "success";
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getMembers({
  userID,
  groupID,
}: {
  userID: string;
  groupID: string;
}) {
  const parsedUserID = stringToObjectId(userID);
  const parsedGroupID = stringToObjectId(groupID);

  const user = await User.findById(parsedUserID);
  if (!user?.groups.map((group) => group.toString()).includes(groupID))
    throw new Error("User not a member of this Group");

  const groupMembersDocument = await Group.findById(parsedGroupID).select(
    "members"
  );

  if (!groupMembersDocument) throw new Error("Couldn't find group document");

  const groupMembers = await Promise.all(
    groupMembersDocument.members.map(async (memberID) => {
      const userDoc = await User.findById(memberID);
      if (!userDoc) throw new Error("Couldn't retrieve group document");
      const userInfo = {
        username: userDoc.username,
        tag: userDoc.tag,
        photo: userDoc.photo,
      };

      return userInfo;
    })
  );

  if (!groupMembers) throw new Error("Could not get group members");
}
