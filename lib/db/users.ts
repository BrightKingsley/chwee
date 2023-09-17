import { User } from "@/models";
import connectDB from "./connect-db";
import { generatePassword, stringToObjectId } from "../utils";
import { UserClass } from "@/models/User";
import bcrypt from "bcrypt";

// Define the number of salt rounds for password hashing
const saltRounds = 10;

export async function createUser({
  email,
  username,
  photoURL,
  password,
  tag,
}: {
  username: string;
  email: string;
  photoURL?: string;
  tag: string;
  password?: string;
}): Promise<UserClass> {
  try {
    console.log("USERDATA", email, username, photoURL, tag, password);
    if (password) {
      // Generate a random password

      // Generate a salt for password hashing
      const salt = await bcrypt.genSalt(saltRounds);

      // Hash the generated password
      const hashedPassword = await bcrypt.hash(password, salt);

      console.log("HASHED_PASS", hashedPassword);

      // Create the user with a hashed password
      const user = await User.create({ email, username, photoURL, tag, password:hashedPassword });

      return user;
    }

    await connectDB();
    const user = await User.create({ email, username, photoURL, tag });
    return user;
  } catch (error: any) {
    return error;
  }
}

export async function getUserByID({ userID }: { userID: string }) {
  try {
    await connectDB();

    const parsedID = stringToObjectId(userID);

    if (!parsedID) {
      return { error: "User not Found" };
    }

    const user = await User.findById(parsedID);

    if (!user) return null;

    return user;
  } catch (error) {
    return error;
  }
}


export async function getUserByEmail({ email }: { email: string }) {
  try {
    await connectDB();

    const user = await User.findOne({
      email,
    });

    if (!user) return null;

    return user;
  } catch (error) {
    return error;
  }
}


export async function getUserByTag({ tag }: { tag: string }) {
  try {
    await connectDB();

    const user = await User.findOne({
      tag,
    });

    if (!user) return null;

    return user;
  } catch (error) {
    return error;
  }
}

export async function deleteUser({ userID }: { userID: string }) {
  try {
    await User.findByIdAndDelete(userID);
    return true;
  } catch (error) {
    return false;
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
