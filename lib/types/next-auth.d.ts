import { UserClass } from "@/models";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string | null;
      name: string | null;
      email: string | null;
      accessToken?: string | null;
      image?: string | null;
      tag: string | null;
    };
  }
}
