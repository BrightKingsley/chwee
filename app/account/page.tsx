import { Header } from "@/components";
import Image from "next/image";
import { Session, getServerSession } from "next-auth";
import { UserIcon } from "@heroicons/react/20/solid";
import { SignOutButton } from "./components";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { signOut } from "next-auth/react";
import { BASE_URL } from "@/constants/routes";

export default async function Account() {
  const data = await getServerSession(authOptions);

  const serverSession: Session | null = data;

  if (
    !serverSession?.user ||
    !serverSession.user.id ||
    !serverSession.user.email
  ) {
    console.log("UNAUTHORIZED");
    const res = await fetch(`${BASE_URL}/api/auth/signout`, {
      method: "POST",
      headers: {
        user_id: serverSession?.user.id!,
      },
    });

    console.log(await res);
  }
  console.log("SERVER_SESSION", serverSession);

  // const navigate = useNavigate();

  if (!serverSession) return <h1>Loading...</h1>;

  return (
    <>
      <div className="flex flex-col h-screen">
        <Header title="My Account" />
        {!serverSession || !serverSession.user ? (
          <h1>Loading...</h1>
        ) : (
          <div className="h-full py-4">
            <div className="space-y-4">
              <div className="relative w-32 h-32 mx-auto rounded-full overflow-clip border">
                {serverSession.user.image ? (
                  <Image src={serverSession.user.image} alt="" fill />
                ) : (
                  <UserIcon className="w-full h-full" />
                )}
              </div>
              <div className="mx-auto text-center w-fit">
                <p className="text-3xl font-druk-wide-bold">
                  {serverSession.user.name}
                </p>
                <p className="tetx-2xl">{serverSession.user.tag}</p>
              </div>
            </div>
            <div className="px-2 space-y-2">
              <small className="font-bold">account actions</small>
              <div>
                <button className="w-full p-2 transition-all duration-100 rounded-md bg-primary/10 active:scale-90 active:shadow-none hover:shadow-md hover:shadow-primary/20 ">
                  change username
                </button>
              </div>
              <div>
                <button className="w-full p-2 transition-all duration-100 rounded-md bg-primary/10 active:scale-90 active:shadow-none hover:shadow-md hover:shadow-primary/20 ">
                  change password
                </button>
              </div>
            </div>
            <div className="mx-2 mt-[80px]">
              <SignOutButton />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
