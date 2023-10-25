import { dbToClientUser } from "@/lib/utils";
import { User } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";
  try {
    const usersDocs = await User.find({
      $text: { $search: query },
    });

    if (!usersDocs) throw new Error("Couldn't retrieve User Documents");
    const users = usersDocs.map((user) => dbToClientUser(user));

    return NextResponse.json(users);
  } catch (error) {
    console.error({ error });
    return NextResponse.json(null, { status: 500 });
  }
}
