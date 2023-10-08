import { Metadata } from "next";
import { redirect } from "next/navigation";

import { useSession } from "next-auth/react";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function DashboardPage() {
  const data = await getServerSession(authOptions);
  const session: Session | any = data;

  console.log("DASH_SESSION", session);

  if (session) {
    return (
      <>
        {/* Signed in as {session ?? session?.user?.email} <br /> */}
        <h1 className="mt-4 font-extrabold text-3xl">
          Hello,
          <span className="text-primary">
            {session.user.name.split(" ")[0]}
          </span>
        </h1>
      </>
    );
  } else return <h1>Hello, . . .</h1>;
}
