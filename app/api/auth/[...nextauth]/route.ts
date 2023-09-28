import NextAuth, { Session, NextAuthOptions } from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  addMemberToGroup,
  connectDB,
  createUser,
  createWallet,
  getUserByEmail,
  getUserByTag,
} from "@/lib/db";
import { comparePasswords } from "@/lib/utils";
import { UserClass } from "@/models/User";
import { User } from "@/models";
import { JWT } from "next-auth/jwt";
import bcrypt from "bcrypt";
import { signJwtAccessToken } from "@/lib/jwt";
import { BASE_URL } from "@/constants/routes";
import { Jwt, JwtPayload } from "jsonwebtoken";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      checks: ["none"],
      httpOptions: {
        timeout: 40000,
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email:",
          type: "email",
          placeholder: "your email",
        },
        password: {
          label: "Pasword",
          type: "password",
          placeholder: "Input a paword",
        },
      },
      // TODO
      // @ts-ignore
      async authorize(credentials, req) {
        // retrieve user data to verify with credentials
        // Docs: https://next-auth.js.org/configuration/providers/credentials

        // retrieve user data to verify with credentials
        // Docs: https://next-auth.js.org/configuration/providers/credentials

        const res = await fetch(`${BASE_URL}/api/auth/login/credentials`, {
          method: "POST",
          body: JSON.stringify(credentials),
        });
        const result = await res.json();
        return result;
      },
    }),
  ],
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async signIn(params) {
      const res = await fetch(`${BASE_URL}/api/auth/login/google-auth`, {
        method: "POST",
        body: JSON.stringify(params),
      });
      const result = await res.json();
      return result.auth;
    },
    async jwt({ token, user, account, profile, session, trigger }) {
      if (!token || !token.email || !token.id)
        return { ...token, error: "UNAUTHORIZED" };

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
          const userFromDB: any = await User.findOne({
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
    async redirect({ url, baseUrl }) {
      return baseUrl;
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

/*
 ====JWT_LOGS==== {
  token: {
    name: 'Bright Kingsley',
    email: 'briggskvngzz@gmail.com',
    picture: 'https://lh3.googleusercontent.com/a/ACg8ocK3vaDtlz1-pjVYVpFHq_bzsfPh24hA5uXyCMHCMJma6is=s96-c',
    sub: '115155470008843609530',
    iat: 1695176133,
    exp: 1695262533,
    jti: 'bb1feacd-a5e5-427b-adc5-1735f2c5ddd2'
  }
} { user: undefined } { account: undefined } { profile: undefined } { session: undefined } { trigger: undefined }
====SESSION_LOGS=== {
  session: {
    user: {
      name: 'Bright Kingsley',
      email: 'briggskvngzz@gmail.com',
      image: 'https://lh3.googleusercontent.com/a/ACg8ocK3vaDtlz1-pjVYVpFHq_bzsfPh24hA5uXyCMHCMJma6is=s96-c'
    },
    expires: '2023-09-21T02:17:12.422Z'
  }
} {
  token: {
    name: 'Bright Kingsley',
    email: 'briggskvngzz@gmail.com',
    picture: 'https://lh3.googleusercontent.com/a/ACg8ocK3vaDtlz1-pjVYVpFHq_bzsfPh24hA5uXyCMHCMJma6is=s96-c',
    sub: '115155470008843609530',
    iat: 1695176133,
    exp: 1695262533,
    jti: 'bb1feacd-a5e5-427b-adc5-1735f2c5ddd2'
  }
} { user: undefined } { newSession: undefined } { trigger: undefined }
CHATS_SERVER_SESSION {
  user: {
    name: 'Bright Kingsley',
    email: 'briggskvngzz@gmail.com',
    image: 'https://lh3.googleusercontent.com/a/ACg8ocK3vaDtlz1-pjVYVpFHq_bzsfPh24hA5uXyCMHCMJma6is=s96-c'
  }
}


 */
