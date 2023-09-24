import { createUser } from "@/lib/db";
import { signJwtAccessToken } from "@/lib/jwt";
import { User, UserClass } from "@/models";
import { NextRequest, NextResponse } from "next/server";

type AuthData = {
  name?: string;
  email?: string;
  password?: string;
};

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const authType = searchParams.get("type");

  if (!authType)
    return NextResponse.json({ error: { message: "No auth type soecified" } });

  async function credentials(
    credentials: Record<"email" | "password", string>
  ) {
    try {
      console.log("CREDENTIALS==>", credentials);

      if (!credentials || !(credentials.email && credentials?.password)) return;

      const user: UserClass | any = await User.find({
        email: credentials.email,
      });

      if (user) {
        // const passwordsMatch =await bcrypt.compare(credentials.password, user.password!)

        console.log("USER EXISTS", user, credentials.password);

        if (credentials.email === user.email) {
          const { password, ...userWithoutPass } = user;
          const accessToken = signJwtAccessToken({
            payload: userWithoutPass,
          });
          console.log("uSer should be logged in now", {
            user,
          });
          return { ...userWithoutPass, accessToken };
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
          tag: `@${generatedUsername}${Date.now()}${Math.random().toFixed(2)}`,
        });

        console.log("NEW_USER => ", newUser, generatedUsername);

        if (!newUser) return null;

        console.log("uSer should be logged in now");
        return {
          name: newUser.username,
          email: newUser.email,
          id: newUser.id,
          image: newUser.photo || null,
        };
      }

      return null;
    } catch (error) {
      console.log("ERROR===>", error);
    }
  }
}
