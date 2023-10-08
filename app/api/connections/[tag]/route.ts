import { getUserByTag } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: {
    tag: string;
  };
};

export async function GET(request: NextRequest, { params: { tag } }: Props) {
  try {
    const user = await getUserByTag({ tag });
    console.log(user);
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Could not get user" });
  }
}
