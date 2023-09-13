import { Group } from "@/models";
import connectDB from "./connect-db";
import { generatePassword, stringToObjectId } from "../utils";
import { GroupClass } from "@/models/Group";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

const saltRounds = 10;

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
  console.log("CREA>TED_WALLET_OWNER", ownerID);
  try {
    await connectDB();

    const parsedID = stringToObjectId(ownerID.trimEnd());
    if (password) {
      const genPass = generatePassword();

      const salt = await bcrypt.genSalt(saltRounds);

      const hashedPassword = await bcrypt.hash(genPass, salt);

      console.log("HASHED_PASS", hashedPassword);

      const group = await Group.create({
        owner: parsedID,
        name: name.trimEnd(),
        description: description.trimEnd(),
        password: hashedPassword,
      });
      return { group, password: genPass };
    }

    const group = await Group.create({
      owner: parsedID,
      name: name.trimEnd(),
      description: description.trimEnd(),
    });

    return { group };
  } catch (error) {
    return { error } as any;
  }
}

export async function getGroup({
  groupID,
  password,
}: {
  groupID: string;
  password?: string;
}) {
  try {
    await connectDB();

    const parsedID = stringToObjectId(groupID);

    console.log("parsedID", parsedID);

    if (!parsedID) {
      return { error: "Group not Found" };
    }

    const group = await Group.findById(parsedID);

    console.log("FOUND_GROUP", group);

    if (!group) return { error: "Group not found" };

    if (group) {
      if (group.password) {
        console.log("pasword available");

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

export async function deleteGroup({ groupID }: { groupID: string }) {
  try {
    await connectDB();

    await Group.findByIdAndDelete(groupID);

    return true;
  } catch (error: any) {
    return { error };
  }
}

export async function deleteAllGroups() {
  try {
    await connectDB();

    await Group.deleteMany();
    return true;
  } catch (error: any) {
    return { error };
  }
}

interface GroupFilter {
  page?: number;
  limit?: number;
}

export async function getGroups(filter: GroupFilter = {}) {
  try {
    await connectDB();
    const page = filter.page ?? 1;
    const limit = filter.limit ?? 10;
    const skip = (page - 1) * limit;

    const groups = await Group.find().skip(skip).limit(limit).lean().exec();

    console.log("WALLETS:", groups);

    return { groups };
  } catch (error) {
    return { error };
  }
}

export async function addMemberToGroup({
  name,
  userID,
}: {
  name: string;
  userID: string;
}) {
  try {
    await connectDB();

    const parsedID = stringToObjectId(userID);

    if (!parsedID) return { error: { message: "Invalid User Id" } };

    const group = await Group.findOne({
      name,
    });
    group?.members.push(parsedID);

    return group;
  } catch (error) {
    return { error };
  }
}
