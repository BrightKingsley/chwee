import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { IconButton } from "@/app/components/mui";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

export default async function UserDisplayPhoto() {
  const serverSession = await getServerSession(authOptions);

  return (
    <div className="w-screen h-screen relative">
      <Link href={"./"} replace className="absolute z-10 top-4 right-4">
        <IconButton>
          <XMarkIcon className="w-8 h-8" />
        </IconButton>
      </Link>
      <Image
        src={serverSession?.user.image as string}
        alt={serverSession?.user.name as string}
        fill
        className="w-full h-full object-contain"
      />
    </div>
  );
}
