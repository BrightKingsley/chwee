import { createUser } from "@/lib/db";
import { NextResponse } from "next/server";

type AuthData = {
  username: string;
  email: string;
  photoURL: string;
  tag: string;
};

export async function POST(request: Request) {
  try {
    const { email, username, photoURL, tag }: AuthData = await request.json();

    if (!(email && name ))
      return NextResponse.json({ error: "Invalid user data" });

    const user = await createUser({ email, username,  tag,photoURL });
    if (!user) return NextResponse.json({ error: "Could not create user" });

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
