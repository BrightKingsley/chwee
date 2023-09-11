import { getUsers } from "@/lib/db";
import { NextResponse } from "next/server";

// type SearchProps = {
//   page: number;
//   limit: number;
// };

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // get page and limit parameters form request url to paginate user data when fetching from database
  const pageParam = searchParams.get("page");
  const limitParam = searchParams.get("limit");

  const page = pageParam ? parseInt(pageParam) : undefined;
  const limit = limitParam ? parseInt(limitParam) : undefined;

  try {
    const users = await getUsers({ page, limit });
    if (!users) return NextResponse.json({ error: "Could not get users" });

    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
