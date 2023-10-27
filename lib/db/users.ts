import {
  Chat,
  Group,
  GroupClass,
  Notification,
  Transaction,
  User,
  Wallet,
} from "@/models";
import connectDB from "./connect-db";
import {
  dbToClientUser,
  formatTag,
  generatePassword,
  lettersAndNumbersOnly,
  stringToObjectId,
} from "../utils";
import { UserClass } from "@/models/User";
import bcrypt from "bcrypt";
import { addMemberToGroupByTag, createWallet } from ".";
import mongoose from "mongoose";
import { ClientUser } from "@/types/models";

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
}): Promise<UserClass | null> {
  try {
    console.log("USERDATA", email, username, photo, tag, password);
    if (password) {
      await connectDB();

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
        tag: formatTag(lettersAndNumbersOnly(tag)),
        password: hashedPassword,
      });

      const newUserWallet = await createWallet({ ownerID: user._id });

      const group: any = addMemberToGroupByTag({
        tag: "general_chat",
        userID: user.id,
      });

      if (!group || group.error)
        console.log("Couldn't add user to general group");

      return user;
    }

    await connectDB();

    const user = await User.create({ email, username, photo, tag });

    const newUserWallet = await createWallet({ ownerID: user._id });

    const group = addMemberToGroupByTag({
      tag: "generalChat",
      // Check this "toString". Is it needed?
      userID: user._id.toString(),
    });

    if (!group) console.log("Couldn't add user to general group");
    console.log({ user, newUserWallet, group });

    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getUserByID({
  userID,
}: {
  userID: string | mongoose.Types.ObjectId;
}): Promise<ClientUser | null> {
  try {
    await connectDB();

    const parsedID =
      typeof userID === "string" ? stringToObjectId(userID) : userID;

    if (!parsedID) throw new Error("Invalid user id");

    const dbUser = await User.findById(parsedID)
      .select("username tag connections groups photo _id")
      .exec();

    if (!dbUser) throw Error("User not found");

    // if (!dbUser.password) return dbUser;

    // const { password, ...userWithoutPass } = dbUser as UserClass;
    const user = dbToClientUser(dbUser);

    // if (!userWithoutPass) return null;

    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getUserByEmail({
  email,
}: {
  email: string;
}): Promise<UserClass | any> {
  try {
    await connectDB();

    // let user: UserClass;

    const dbUser = await User.findOne({
      email,
    });

    if (!dbUser) return null;

    // if (!dbUser.password) {
    //   user = dbUser;
    //   return user;
    // }

    // console.log("DB_EMAIL_USER", dbUser);

    // const { password, ...userWithoutPass } = dbUser;
    // user = userWithoutPass;

    const user = dbToClientUser(dbUser);

    return user;
  } catch (error) {
    return error;
  }
}

export async function getUserByTag({ tag }: { tag: string }) {
  try {
    await connectDB();

    console.log("GET USER BY TAG", { tag });

    // let user: UserClass;

    const dbUser = await User.findOne({
      tag,
    });

    if (!dbUser) return null;

    // if (!dbUser.password) {
    //   user = dbUser;
    //   return user;
    // }

    // const { password, ...userWithoutPass } = dbUser;

    // user = userWithoutPass;

    const user = dbToClientUser(dbUser);

    return user;
  } catch (err) {
    const error = err as Error;
    return null;
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
    await Wallet.findOneAndDelete({ owner: parsedUserID });

    await Notification.deleteMany({ userID: parsedUserID });

    const deletedUser = await User.findByIdAndDelete(user._id);

    console.log("DELETED_USER", deletedUser);

    // TODO: remove user from all events and delete all available user events

    return "success";
  } catch (error) {
    return null;
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

export async function findUsers({
  userID,
  limit,
  page,
}: {
  userID?: string;
  page?: number;
  limit?: number;
}): Promise<ClientUser[] | null> {
  try {
    if (!userID) throw new Error("Unauthorized");

    const parsedUserID = stringToObjectId(userID);

    const user = await User.findById(parsedUserID);

    if (!user) throw new Error("User not found");

    // get page and limit parameters form request url to paginate user data when fetching from database

    const users: any = await getUsers({ page, limit });
    if (!users) throw new Error("Could not get Users");

    const usersWithoutCommonChats: ClientUser[] = await User.aggregate([
      {
        $match: {
          _id: { $ne: parsedUserID },
          chats: { $nin: user.chats },
        },
      },
      {
        $project: {
          username: 1,
          tag: 1,
          photo: 1,
          chats: 1,
          connections: 1,
          groups: 1,
        },
      },
    ]);

    console.log("-----UsersWithoutCommonChats: ", usersWithoutCommonChats);

    const filteredUsers = usersWithoutCommonChats.filter(
      (user: ClientUser) => user._id.toString() !== parsedUserID?.toString()
    );

    return filteredUsers;
  } catch (error) {
    console.error({ error });
    return null;
  }
}
