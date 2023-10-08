import { deleteUserConnection, getUserByTag } from "@/lib/db";
import { createUserConnection } from "@/lib/db";
import { User } from "@/models";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { stringToObjectId } from "@/lib/utils";

// export async function GET(request: NextRequest, { params: { tag } }) {
export async function GET(request: NextRequest) {
  try {
    const serverSession = await getServerSession(authOptions);

    const sessionUser = serverSession?.user;

    console.log({ sessionUserFromGETCONNECTIONS: sessionUser });

    if (!sessionUser) throw new Error("Invalid user");

    const parsedUserID = stringToObjectId(sessionUser.id!);

    const userConnectionsDocument = await User.findById(parsedUserID).select(
      "connections"
    );

    if (!userConnectionsDocument)
      throw new Error("Couldn't find user document");

    const userConnections = await Promise.all(
      userConnectionsDocument.connections.map(async (connectionID) => {
        const userDoc = await User.findById(connectionID);
        if (!userDoc) throw new Error("Couldn't retrieve user document");
        const userInfo = {
          username: userDoc.username,
          tag: userDoc.tag,
          photo: userDoc.photo,
        };

        return userInfo;
      })
    );

    if (!userConnections) throw new Error("Could not get user connections");

    return NextResponse.json(userConnections);
  } catch (error) {
    console.error({ error });
    return NextResponse.json(null);
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const connectionID = data.receiver;

    const serverSession = await getServerSession(authOptions);

    console.log("CONNECT_SESION: ", { serverSession });

    if (
      !serverSession ||
      !serverSession.user ||
      !serverSession.user.id ||
      !connectionID
    )
      throw new Error("No/Invalid Connection Id");

    const connections = await createUserConnection({
      connectionID,
      userID: serverSession?.user.id,
    });
    return NextResponse.json(connections);
  } catch (error) {
    console.error({ error });
    return NextResponse.json({ error: { message: "An error Occured" } });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const data = await request.json();
    const connectionID = data.receiver;

    const serverSession = await getServerSession(authOptions);

    console.log("CONNECT_SESION: ", { serverSession });

    if (
      !serverSession ||
      !serverSession.user ||
      !serverSession.user.id ||
      !connectionID
    )
      throw new Error("No/Invalid Connection Id");

    const connections = await deleteUserConnection({
      connectionID,
      userID: serverSession?.user.id,
    });
    return NextResponse.json(connections);
  } catch (error) {
    console.error({ error });
    return NextResponse.json({ error: { message: "An error Occured" } });
  }
}
