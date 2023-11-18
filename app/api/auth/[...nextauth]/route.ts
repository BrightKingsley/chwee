import NextAuth, { Session, NextAuthOptions } from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  addMemberToGroupByID,
  findGroupByTagAndAddMember,
  connectDB,
  createUser,
  createWallet,
  getUserByEmail,
  getUserByTag,
} from "@/lib/db";
import { comparePasswords, generatePassword } from "@/lib/utils";
import { UserClass } from "@/models/User";
import { User } from "@/models";
import { JWT } from "next-auth/jwt";
import bcrypt from "bcrypt";
import { signJwtAccessToken } from "@/lib/jwt";
import { BASE_URL } from "@/constants/routes";
import { Jwt, JwtPayload } from "jsonwebtoken";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { signIn } from "next-auth/react";

export const authOptions: NextAuthOptions = {
  debug: true,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      httpOptions: {
        timeout: 400000,
      },
    }),
  ],
  pages: {
    signIn: "/onboarding",
    signOut: "/onboarding",
  },
  callbacks: {
    async signIn({ profile, account, user: authUser, credentials, email }) {
      try {
        if (
          credentials?.csrfToken &&
          credentials.email &&
          credentials.password
        ) {
          return true;
        }

        let googleProfile: GoogleProfile = profile as GoogleProfile;
        let user: UserClass;

        if (!profile || !profile.email)
          throw new Error("Google profile not found");

        const userExists = await getUserByEmail({
          email: profile?.email,
        });

        user = userExists;

        if (!(userExists && user) && profile?.email && profile?.name) {
          const newUser = await createUser({
            email: profile.email.toString().trim(),
            username: profile.name
              .toString()
              .trim()
              .split(" ")[0]
              .split("")
              .reverse()
              .join("")
              .trim(),
            photo: googleProfile.picture,
            tag: `@${profile.name
              .toString()
              .trim()
              .split(" ")[0]
              .split("")
              .reverse()
              .join("")
              .trim()}${generatePassword(6)}`,
          });
          if (!newUser) return false;
          user = newUser;
          findGroupByTagAndAddMember({
            tag: "@GeneralChat",
            userID: user._id.toString(),
          });
        }

        if (!user) return false;

        // const accessToken = signJwtAccessToken({ payload: userWithoutPass });

        return true;
      } catch (error) {
        console.error({ error });
        return false;
      }
    },

    async jwt({ token, user, account, profile, session, trigger }) {
      if (!token || !token.email || !token.id) return token;

      try {
        await connectDB();
        const userFromDB: UserClass = await getUserByEmail({
          email: token.email,
        });
        if (!userFromDB) {
          token.id = null;
          token.email = null;

          return token;
        }
        token.sub = userFromDB._id.toString();
        return token;
      } catch (error) {
        console.error(error);
        token.id = null;
        token.email = null;
        return token;
      }
    },
    async session({ session, token, user, newSession, trigger }) {
      if (session.user?.email) {
        try {
          await connectDB();
          const userFromDB = await User.findOne({
            email: session.user.email,
          });

          if (userFromDB) {
            session.user.name = userFromDB.username;
            session.user.image = userFromDB.photo;
            session.user.tag = userFromDB.tag;
            session.user.id = userFromDB._id.toString();
            return session;
          } else {
            // User not found in the database, handle this situation as needed.
            // For example, you can log an error or remove the user from the session.
            // delete session.user;
            console.error(
              `User with email ${session.user.email} not found in the database.`
            );
            session.user.name = null;
            session.user.image = null;
            session.user.tag = null;
            session.user.id = null;
            return { ...session, error: "UNAUTHENTICATED" };
            // return session;
          }
        } catch (error) {
          console.error("Error fetching user from database:", error);
        }
      }

      //TODO COMEBACK and check these
      // session.user == (token as any);

      return session;
    },
  },

  events: {
    async signOut({ token, session }) {
      console.log("SIGNING_OUT!");
      return;
    },
  },
  session: {
    maxAge: 24 * 60 * 60,
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
