import NextAuth, { Session } from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB, createUser, createWallet } from "@/lib/db";
import { UserClass } from "@/models/User";
import { User } from "@/models";
import { JWT } from "next-auth/jwt";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    /* CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username:",
          type: "text",
          placeholder: "your cool username",
        },
        password: {
          label: "Pasword",
          type: "password",
          placeholder: "Input a paword",
        },
      },
      // TODO
      // @ts-ignore
      async authorize(credentials) {
        // retrieve user data to verify with credentials
        // Docs: https://next-auth.js.org/configuration/providers/credentials
        const user = { id: 12, name: "King", password: "test1234" };

        if (
          credentials?.username === user.name &&
          credentials?.password === user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
    */
  ],
  callbacks: {
    async signIn({ profile }) {
      console.log("PROFILE:=======> ", profile);
      let googleProfile: GoogleProfile = profile as GoogleProfile;
      try {
        await connectDB();
        const userExists = await User.findOne({
          email: profile?.email,
        });

        console.log("USER_EXISTS: ===>", userExists);

        if (!userExists && profile?.email && profile?.name) {
          const newUser = await createUser({
            email: profile.email.toString(),
            username: profile.name.toString(),
            photoURL: googleProfile.picture,
            tag: `@${profile.name}${Date.now()}${Math.random().toFixed(2)}`,
          });
          if (!newUser) return false;
          const newUserWallet = await createWallet({ ownerID: newUser.id });

          console.log("NEW_USER: ", newUser, "NEWUSERWALLET: ", newUserWallet);
        }

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    async jwt({ token, user }) {
      console.log("TOKEN, USER", token, user);
      if (user) {
        token.email = user.email;
        token.id = user.id;
      }

      return token;
    },
    async session({ session, token }: { session: Session | any; token: JWT }) {
      if (session.user?.email) {
        try {
          await connectDB();
          const sessionUser = await User.findOne({
            email: session.user.email,
          });

          if (sessionUser) {
            console.log("SESSION_USER", sessionUser);

            session.user.id = sessionUser.id.toString();
          } else {
            // User not found in the database, handle this situation as needed.
            // For example, you can log an error or remove the user from the session.
            // delete session.user;
            console.error(
              `User with email ${session.user.email} not found in the database.`
            );
          }
        } catch (error) {
          console.error("Error fetching user from database:", error);
        }
      }

      // TODO COMEBACK and check these
      session.user.id == token.id;
      session.user.name = token.name;

      return session;
    },
  },
  session: {
    maxAge: 24 * 60 * 60,
  },
});

export { handler as GET, handler as POST };
