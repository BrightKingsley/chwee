import { NextResponse } from "next/server";

type AuthData = {
  name?: string;
  email?: string;
  password?: string;
};

export async function POST(request: Request) {
  const data: AuthData = await request.json();

  const { email, name, password } = data;

  return NextResponse.json({ email, name, password });
}
