import { User } from "@/models";
import connectDB from "./connect-db";
import { stringToObjectId } from "../utils";
import { UserClass } from "@/models/User";

export async function createUser({
  email,
  username,
  photoURL,
  tag,
}: {
  username: string;
  email: string;
  photoURL: string;
  tag: string;
}):Promise<UserClass> {
  console.log("USERDATA", email, username, photoURL, tag)
  try {
    await connectDB();
    const user = await User.create({ email, username, photoURL, tag });
    return user;
  } catch (error: any) {
    return error;
  }
}

export async function getUser({ userID }: { userID: string }) {
  try {
    await connectDB();

    const parsedID = stringToObjectId(userID);

    if (!parsedID) {
      return { error: "User not Found" };
    }

    const user = await User.findById(parsedID);

    if (!user) return { error: "User not found" };

    return user;
  } catch (error) {
    return error;
  }
}

export async function deleteUser({userID}: { userID :string}) {
  try {
    await User.findByIdAndDelete(userID)
    return  true
  } catch (error) {
    return false
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

    return { users };
  } catch (error) {
    return error;
  }
}
