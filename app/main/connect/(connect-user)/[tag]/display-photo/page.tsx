import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { IconButton } from "@/app/components/mui";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { getUserByTag } from "@/lib/db";

export default async function UserDisplayPhoto({
  params,
}: {
  params: { tag: string };
}) {
  const decodedTag = decodeURIComponent(params.tag);
  const user = await getUserByTag({ tag: decodedTag });
  if (!user) return null;

  return (
    <div className="w-screen h-screen relative">
      <Link href={"./"} replace className="absolute z-10 top-4 right-4">
        <IconButton>
          <XMarkIcon className="w-8 h-8" />
        </IconButton>
      </Link>
      <Image
        src={user.photo as string}
        alt={user.tag as string}
        fill
        className="w-full h-full object-contain"
      />
    </div>
  );
}
