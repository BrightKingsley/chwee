import { User } from "@/models";
import { stringToObjectId } from "../utils";

export async function getUserConnections({ userID }: { userID: string }) {
  try {
    const parsedUserID = stringToObjectId(userID);
    if (!parsedUserID) throw new Error("Invalid User Id");

    const connections = await User.findById(parsedUserID).select("connections");

    console.log({ connections });

    if (!connections) throw new Error("No Connections Found");

    return connections;
  } catch (error) {
    console.error({ error });
    return null;
  }
}

export async function createUserConnection({
  userID,
  connectionID,
}: {
  userID: string;
  connectionID: string;
}) {
  try {
    const parsedUserID = stringToObjectId(userID);
    const parsedConnectionID = stringToObjectId(connectionID);
    if (!parsedUserID) throw new Error("Invalid User Id");

    const newUserDoc = await User.findOneAndUpdate(
      { _id: parsedUserID, connections: { $nin: [parsedConnectionID] } },
      { $addToSet: { connections: parsedConnectionID } },
      { new: true }
    ).exec();

    const newConnectionDoc = await User.findByIdAndUpdate(parsedConnectionID, {
      $push: {
        connections: parsedUserID,
      },
    }).select("connections");
    if (!(newUserDoc && newConnectionDoc))
      throw new Error("No Connections Found");
    newUserDoc?.save();
    newConnectionDoc?.save();

    console.log({ newUserDoc });

    console.log("CONNECTION CREATED SUCCESSFULLY", { newUserDoc });

    return newUserDoc;
  } catch (error) {
    console.error({ error });
    return null;
  }
}

export async function deleteUserConnection({
  userID,
  connectionID,
}: {
  userID: string;
  connectionID: string;
}) {
  try {
    const parsedUserID = stringToObjectId(userID);
    const parsedConnectionID = stringToObjectId(connectionID);
    if (!parsedUserID) throw new Error("Invalid User Id");

    const newUserDoc = await User.findOneAndUpdate(
      {
        _id: parsedUserID,
        connections: parsedConnectionID,
      },
      {
        $pull: {
          connections: parsedConnectionID,
        },
      },
      { new: true }
    ).exec();

    const newConnectionDoc = await User.findOneAndUpdate(
      {
        _id: parsedConnectionID,
        connections: parsedUserID,
      },
      {
        $pull: {
          connections: parsedUserID,
        },
      },
      { new: true }
    ).exec();
    if (!(newUserDoc && newConnectionDoc))
      throw new Error("No Connections Found");
    newUserDoc?.save();
    newConnectionDoc?.save();

    console.log({ newUserDoc });

    console.log("CONNECTION DELETED SUCCESSFULLY", { newUserDoc });

    return newUserDoc;
  } catch (error) {
    console.error({ error });
    return null;
  }
}
