import NextAuth, { Session, NextAuthOptions } from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  addMemberToGroupByID,
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
// import { clientPromise } from "@/lib/config";

export const authOptions: NextAuthOptions = {
  debug: true,
  // adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      httpOptions: {
        timeout: 400000,
      },
      // authorization: {
      //   url: "https://chwee.vercel.app",
      // },
    }),
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     email: {
    //       label: "email:",
    //       type: "email",
    //       placeholder: "your email",
    //     },
    //     password: {
    //       label: "Pasword",
    //       type: "password",
    //       placeholder: "Input a paword",
    //     },
    //   },
    //   // TODO
    //   // @ts-ignore
    //   async authorize(credentials, req) {
    //     // retrieve user data to verify with credentials
    //     // Docs: https://next-auth.js.org/configuration/providers/credentials

    //     // retrieve user data to verify with credentials
    //     // Docs: https://next-auth.js.org/configuration/providers/credentials

    //     try {
    //       if (!credentials || !(credentials.email && credentials?.password))
    //         return null;

    //       await connectDB();
    //       const user = (await User.findOne({
    //         email: credentials.email,
    //       })) as UserClass | null;

    //       if (user) {
    //         const passwordsMatch = await bcrypt.compare(
    //           credentials.password,
    //           user.password as string
    //         );

    //         if (credentials.email === user.email && passwordsMatch) {
    //           console.log("uSer should be logged in now", {
    //             name: user.username,
    //             email: user.email,
    //             id: user._id,
    //             image: user.photo || null,
    //           });
    //           return {
    //             name: user.username,
    //             email: user.email,
    //             id: user.id,
    //             image: user.photo || null,
    //           };
    //         }
    //       } else {
    //         const generatedUsername = credentials?.email
    //           .split("@")[0]
    //           .toString()
    //           .trim();
    //         const newUser = await createUser({
    //           email: credentials.email.toString().trim(),
    //           username: generatedUsername,
    //           password: credentials.password,
    //           tag: `@${generatedUsername}${generatePassword(6)}`,
    //         });

    //         if (!newUser) return null;

    //         return {
    //           name: newUser.username,
    //           email: newUser.email,
    //           id: newUser.id,
    //           image: newUser.photo || "",
    //         };
    //       }
    //     } catch (error) {
    //       console.error(error);
    //       return null;
    //     }
    //   },
    // }),
  ],
  // jwt: {
  //   secret: process.env.NEXTAUTH_SECRET,
  // },
  callbacks: {
    async signIn({ profile, account, user: authUser, credentials, email }) {
      try {
        console.log("AUTHUSER: ", { authUser, profile, credentials });

        if (
          // authUser.id &&
          // authUser.email &&
          // authUser.name &&
          // account?.providerAccountId &&
          // account.type === "credentials" &&
          // account.provider === "credentials" &&
          credentials?.csrfToken &&
          credentials.email &&
          credentials.password
        ) {
          console.log("REACHED_TRUE");
          return true;
        }

        console.log("ALSO_REACHED!!!");

        let googleProfile: GoogleProfile = profile as GoogleProfile;
        let user: any;

        if (!profile || !profile.email)
          throw new Error("Google profile not found");

        const userExists = await getUserByEmail({
          email: profile?.email,
        });

        console.log("USER_EXISTS: ", userExists);

        user = userExists;

        if (!(userExists && user) && profile?.email && profile?.name) {
          const newUser = await createUser({
            email: profile.email.toString().trim(),
            username: profile.name
              .toString()
              .trim()
              .split("")
              .reverse()
              .join()
              .trim(),
            photo: googleProfile.picture,
            tag: `@${profile.name
              .split(" ")[0]
              .split("")
              .reverse()
              .join()
              .trim()}${generatePassword(6)}`,
          });
          if (!newUser) return false;
          user = newUser;
        }

        // const accessToken = signJwtAccessToken({ payload: userWithoutPass });
        console.log("USER_RETURNED: ", user);

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
      console.log("SESSION_DATA: ", { session, token });

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
    // async redirect({ url, baseUrl }) {
    //  return baseUrl;
    // },
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
