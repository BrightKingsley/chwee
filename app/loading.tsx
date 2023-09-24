import { Spinner } from "@/components";

export default function RootLoading() {
  return (
    <div className="w-full h-full bg-white z-40 flex items-center justify-center">
      <Spinner />
    </div>
  );
}
