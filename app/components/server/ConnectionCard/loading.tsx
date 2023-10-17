import { Spinner } from "@/app/components/mui";

export default function LoadingConnectionCard() {
  return (
    <div className="aspect-square !p-0 col-span-1 row-span-1 overflow-clip border-[1px]">
      <div className="w-full h-full">
        <div className="relative flex items-center justify-center w-full h-full after:absolute a">
          <Spinner className="w-10 h-10" />
          <div className="absolute bottom-0 z-10 w-full p-1 bg-white">
            <p className="w-full text-xs font-extrabold bg-gray-400 animate-loader" />
            <small className="w-full text-xs bg-gray-400 animate-loader" />
          </div>
        </div>
      </div>
    </div>
  );
}
