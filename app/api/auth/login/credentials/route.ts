import { connectDB, createUser, getUserByEmail } from "@/lib/db";
import { User, UserClass } from "@/models";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { generatePassword } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    const credentials: Record<"email" | "password", string> | undefined =
      await request.json();

    if (!credentials || !(credentials.email && credentials?.password))
      return NextResponse.json(null);

    await connectDB();
    const user = (await User.findOne({
      email: credentials.email,
    })) as UserClass | null;

    if (user) {
      const passwordsMatch = await bcrypt.compare(
        credentials.password,
        user.password as string
      );

      if (credentials.email === user.email && passwordsMatch) {
        console.log("uSer should be logged in now", {
          name: user.username,
          email: user.email,
          id: user._id,
          image: user.photo || null,
        });
        return NextResponse.json({
          name: user.username,
          email: user.email,
          id: user.id,
          image: user.photo || null,
        });
      }
    } else {
      const generatedUsername = credentials?.email
        .split("@")[0]
        .toString()
        .trim();

      const newUser = await createUser({
        email: credentials.email.toString().trim(),
        username: generatedUsername,
        password: credentials.password,
        tag: `@${generatedUsername}${generatePassword(6)}`,
      });

      if (!newUser) return NextResponse.json(null);

      return NextResponse.json({
        name: newUser.username,
        email: newUser.email,
        id: newUser.id,
        image: newUser.photo || null,
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error });
  }
}
