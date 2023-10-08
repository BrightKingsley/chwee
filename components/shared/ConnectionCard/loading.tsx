import { Spinner } from "@/components/mui";

export default function LoadingConnectionCard() {
  return (
    <div className="aspect-square !p-0 col-span-1 row-span-1 overflow-clip border-[1px]">
      <div className="w-full h-full">
        <div className="w-full h-full relative after:absolute a">
          <Spinner color="gray" className="h-10 w-10" />
          <div className="absolute bottom-0 p-1 z-10 w-full bg-white">
            <p className="font-extrabold animate-loader bg-gray-400 text-xs w-full" />
            <small className="text-xs w-full animate-loader bg-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
