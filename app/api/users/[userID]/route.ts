import { deleteUser, getUser } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: {
    userID: string;
  };
};

export async function GET(request: NextRequest, { params: { userID } }: Props) {
  // const id = request.url.slice(request.url.lastIndexOf("/") + 1)
  try {
    const user = await getUser({ userID });
    console.log(user);
    return NextResponse.json(user );
  } catch (error) {
    return NextResponse.json({ error: "Could not get user" });
  }
}

type DeleteProps = {
  userID: string;
};

// TODO remember to use correct Status Codes
export async function DELETE(request: NextRequest, { params: { userID } }: Props) {
  try {
    // const { userID }: DeleteProps = await request.json();
    const userDeleted = await deleteUser({ userID });

    if (!userDeleted)
      return NextResponse.json({ mesage: "Couldn't delete user document" });

    return NextResponse.json({ message: "user Deleted Successfully" });
  } catch (error) {
    return NextResponse.json({
      message: "Server Error",
    });
  }
}
