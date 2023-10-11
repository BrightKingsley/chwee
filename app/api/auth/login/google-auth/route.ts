import { NextRequest, NextResponse } from "next/server";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import {
  addMemberToGroupByTag,
  connectDB,
  createUser,
  createWallet,
  getUserByEmail,
} from "@/lib/db";
import { signJwtAccessToken } from "@/lib/jwt";
import { Account, Profile, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { generatePassword } from "@/lib/utils";

type GoogleAuthParams = {
  user: User | AdapterUser;
  account: Account | null;
  profile?: Profile | undefined;
  email?:
    | {
        verificationRequest?: boolean | undefined;
      }
    | undefined;
  credentials?: Record<any, any> | undefined;
};

export async function POST(
  request: NextRequest
): Promise<NextResponse<{ auth: boolean }>> {
  try {
    const params = await request.json();

    if (!params) throw new Error("Invalid params");
    const {
      profile,
      account,
      user: authUser,
      credentials,
      email,
    } = params as GoogleAuthParams;

    console.log("PARAMS: ", params);

    if (
      authUser.id &&
      authUser.email &&
      authUser.name &&
      account?.providerAccountId &&
      account.type === "credentials" &&
      account.provider === "credentials" &&
      credentials?.csrfToken &&
      credentials.email &&
      credentials.password
    )
      return NextResponse.json({ auth: true });

    let googleProfile: GoogleProfile = profile as GoogleProfile;
    let user: any;

    if (!profile || !profile.email) throw new Error("Google profile not found");

    const userExists = await getUserByEmail({
      email: profile?.email,
    });

    user = userExists;

    if (!(userExists && user) && profile?.email && profile?.name) {
      const newUser = await createUser({
        email: profile.email.toString().trim(),
        username: profile.name.toString().trim(),
        photo: googleProfile.picture,
        tag: `@${profile.name.split(" ")[0]}${generatePassword(6)}`,
      });
      if (!newUser) return NextResponse.json({ auth: false });

      user = newUser;
    }

    // const accessToken = signJwtAccessToken({ payload: userWithoutPass });
    return NextResponse.json({ auth: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ auth: false });
  }
}
