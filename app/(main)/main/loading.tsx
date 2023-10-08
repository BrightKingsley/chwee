import { Spinner } from "@/components/mui";

export default function RootLoading() {
  return (
    <div className="z-40 flex items-center justify-center w-screen h-screen bg-white">
      <Spinner color="deep-orange" className="w-10 h-10" />
    </div>
  );
}
