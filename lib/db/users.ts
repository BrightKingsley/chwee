import { Chat, Group, GroupClass, User, Wallet } from "@/models";
import connectDB from "./connect-db";
import { generatePassword, stringToObjectId } from "../utils";
import { UserClass } from "@/models/User";
import bcrypt from "bcrypt";
import { addMemberToGroup, createWallet } from ".";
import mongoose from "mongoose";
import Chats from "@/app/chat/(chat-list)/chats/page";

// Define the number of salt rounds for password hashing
const saltRounds = 10;

export async function createUser({
  email,
  username,
  photo,
  password,
  tag,
}: {
  username: string;
  email: string;
  photo?: string;
  tag: string;
  password?: string;
}): Promise<UserClass> {
  try {
    console.log("USERDATA", email, username, photo, tag, password);
    if (password) {
      // Generate a random password

      // Generate a salt for password hashing
      const salt = await bcrypt.genSalt(saltRounds);

      // Hash the generated password
      const hashedPassword = await bcrypt.hash(password, salt);

      console.log("HASHED_PASS", hashedPassword);

      // Create the user with a hashed password
      const user = await User.create({
        email,
        username,
        photo,
        tag,
        password: hashedPassword,
      });

      const newUserWallet = await createWallet({ ownerID: user.id });

      const group: any = addMemberToGroup({
        name: "general chat",
        userID: user.id,
      });

      if (!group || group.error)
        console.log("Couldn't add user to general group");

      return user;
    }

    await connectDB();
    const user = await User.create({ email, username, photo, tag });
    return user;
  } catch (error: any) {
    return error;
  }
}

export async function getUserByID({
  userID,
}: {
  userID: string | mongoose.Types.ObjectId;
}) {
  try {
    await connectDB();

    const parsedID =
      typeof userID === "string" ? stringToObjectId(userID) : userID;

    if (!parsedID) {
      return { error: "User not Found" };
    }

    const dbUser = await User.findById(parsedID);

    if (!dbUser) return null;

    if (!dbUser.password) return dbUser;

    const { password, ...userWithoutPass } = dbUser as UserClass;

    if (!userWithoutPass) return null;

    return userWithoutPass;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getUserByEmail({
  email,
}: {
  email: string;
}): Promise<UserClass | any> {
  try {
    await connectDB();

    let user: UserClass;

    const dbUser = await User.findOne({
      email,
    });

    if (!dbUser) return null;

    if (!dbUser.password) {
      user = dbUser;
      return user;
    }

    console.log("DB_EMAIL_USER", dbUser);

    const { password, ...userWithoutPass } = dbUser;
    user = userWithoutPass;

    return user;
  } catch (error) {
    return error;
  }
}

export async function getUserByTag({ tag }: { tag: string }) {
  try {
    await connectDB();

    let user: UserClass;

    const dbUser = await User.findOne({
      tag,
    });
    if (!dbUser) return null;

    if (!dbUser.password) {
      user = dbUser;
      return user;
    }

    const { password, ...userWithoutPass } = dbUser;

    user = userWithoutPass;

    return user;
  } catch (err) {
    const error = err as Error;
    return { error };
  }
}

export async function deleteUser({ userID }: { userID: string }) {
  try {
    const parsedUserID = stringToObjectId(userID);

    const user = await User.findById(parsedUserID);

    if (!user) throw new Error("user not found");

    await Wallet.findOneAndDelete({ owner: parsedUserID });

    await Chat.updateMany(
      {
        _id: { $in: user.chats },
        members: parsedUserID,
      },
      { $pullAll: { members: [parsedUserID] } }
    );

    await Group.updateMany(
      {
        _id: { $in: user.groups },
        members: parsedUserID,
      },
      { $pullAll: { members: [parsedUserID] } }
    );

    const deletedUser = await User.findByIdAndDelete(user._id);

    console.log("DELETED_USER", deletedUser);

    // TODO: remove user from all events and delete all available user events

    return deletedUser;
  } catch (error) {
    throw error;
  }
}

interface UserFilter {
  page?: number;
  limit?: number;
}

export async function getUsers(filter: UserFilter = {}) {
  try {
    await connectDB();
    const page = filter.page ?? 1;
    const limit = filter.limit ?? 10;
    const skip = (page - 1) * limit;

    const users = await User.find().skip(skip).limit(limit).lean().exec();

    return users;
  } catch (error) {
    return { error };
  }
}
