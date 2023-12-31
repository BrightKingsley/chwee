import { deleteUser, getUserByID, getUsers } from "@/lib/db";
import { stringToObjectId } from "@/lib/utils";
import { User, UserClass } from "@/models";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

// type SearchProps = {
//   page: number;
//   limit: number;
// };

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const headersList = headers();
    const userID = headersList.get("user_id");

    if (!userID)
      return NextResponse.json({ error: { message: "Unauthorized" } });

    const parsedUserID = stringToObjectId(userID);

    const user = await User.findById(parsedUserID);

    if (!user) throw new Error("User not found");

    // get page and limit parameters form request url to paginate user data when fetching from database
    const pageParam = searchParams.get("page");
    const limitParam = searchParams.get("limit");

    const page = pageParam ? parseInt(pageParam) : undefined;
    const limit = limitParam ? parseInt(limitParam) : undefined;

    const users: any = await getUsers({ page, limit });
    if (!users)
      return NextResponse.json(
        { error: "Could not get users" },
        {
          status: 404,
        }
      );

    const usersWithoutCommonChats = await User.aggregate([
      {
        $match: {
          _id: { $ne: parsedUserID },
          chats: { $nin: user.chats },
        },
      },
    ]);

    console.log("-----UsersWithoutCommonChats: ", usersWithoutCommonChats);

    const filteredUsers = usersWithoutCommonChats.filter(
      (user: UserClass) => user._id.toString() !== parsedUserID?.toString()
    );

    return NextResponse.json(filteredUsers);
  } catch (error) {
    return NextResponse.json(
      { error },
      {
        status: 500,
      }
    );
  }
}

/*
//TODO: remember to disable/ remove this, along with other delete REQUESTS
export async function DELETE() {
  try {
    const users = await User.find();
    const deletedUsers = users.map(
      async (user) => await deleteUser({ userID: user.id })
    );
    const result = await Promise.all(deletedUsers);

    console.log("DELETED_USERS: ", result);

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    NextResponse.json({ error });
  }
}
*/

// TODO remember to use correct Status Codes
export async function DELETE(request: NextRequest) {
  try {
    const serverSession = await getServerSession(authOptions);
    if (!serverSession || !serverSession.user || !serverSession.user.id)
      throw new Error("Invaalid User");
    const userID = serverSession.user.id;

    // const { userID }: DeleteProps = await request.json();
    const userDeleted = await deleteUser({ userID });

    if (!userDeleted)
      return NextResponse.json({ message: "Couldn't delete user document" });

    return NextResponse.json(userDeleted);
  } catch (error) {
    console.error({ error });
    return NextResponse.json(null, {
      status: 500,
    });
  }
}
