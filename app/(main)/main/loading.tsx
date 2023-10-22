import { Spinner } from "@/app/components/mui";

export default function RootLoading() {
  return (
    <div className="z-40 flex items-center justify-center w-screen h-screen">
      <Spinner className="w-10 h-10" />
    </div>
  );
}
