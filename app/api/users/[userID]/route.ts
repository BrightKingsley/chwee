import { deleteUser, getUserByID } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@/models";
import {
  formatTag,
  lettersAndNumbersOnly,
  stringToObjectId,
} from "@/lib/utils";

type Props = {
  params: {
    userID: string;
  };
};

export async function GET(request: NextRequest, { params: { userID } }: Props) {
  // const id = request.url.slice(request.url.lastIndexOf("/") + 1)
  try {
    const user = await getUserByID({ userID });
    console.log(user);
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Could not get user" });
  }
}

export async function PATCH(request: NextRequest, { params }: Props) {
  try {
    const { username, tag, photo } = await request.json();

    const sessionUser = await getServerSession(authOptions);

    const userID = sessionUser?.user.id;
    if (!userID || userID !== params.userID) throw new Error("Invalid User ID");

    const parsedUserID = stringToObjectId(userID);

    const userDoc = await User.findById(parsedUserID);
    if (!userDoc) throw new Error("Couldn't retrieve user document");

    if (username) {
      userDoc.username = username;
    }

    if (tag) {
      userDoc.tag = formatTag(lettersAndNumbersOnly(tag));
    }

    if (photo) {
      userDoc.photo = photo;
    }

    userDoc.save();
    return NextResponse.json({ message: "success" });
  } catch (error) {
    console.error({ error });
    return NextResponse.json({
      error: { message: "Couldn't update user doc" },
    });
  }
}

type DeleteProps = {
  userID: string;
};

// TODO remember to use correct Status Codes
export async function DELETE(
  request: NextRequest,
  { params: { userID } }: Props
) {
  try {
    // const { userID }: DeleteProps = await request.json();
    const userDeleted = await deleteUser({ userID });

    if (!userDeleted)
      return NextResponse.json({ message: "Couldn't delete user document" });

    return NextResponse.json({ message: "user Deleted Successfully" });
  } catch (error) {
    return NextResponse.json({
      message: "Server Error",
    });
  }
}
