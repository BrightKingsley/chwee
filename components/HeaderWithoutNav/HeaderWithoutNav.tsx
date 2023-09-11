import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import Link from "next/link"
import { HeaderWithoutNavType } from "./types";

export default function HeaderWithoutNav({ title }: HeaderWithoutNavType) {
  // const location = useLocation();
  // const source = location.state?.source;

  return (
    <header className="relative flex items-center w-screen px-3 py-1 bg-white border-b h-14">
      <Link
        // href={source || "/"}
        href={ "/"}
        className="text-3xl active:scale-75 active:opacity-50"
      >
        <ChevronLeftIcon />
      </Link>
      <div className="ml-4 font-bold capitalize">
        <h1>{title}</h1>
      </div>
    </header>
  );
}
