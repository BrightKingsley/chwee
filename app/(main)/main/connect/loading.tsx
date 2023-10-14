import { Header } from "@/components/shared";
import { Spinner } from "@/components/mui";

export default function Loading() {
  return (
    <>
      <Header title="Connect..." />
      <div className="flex items-center justify-center w-full h-full pt-24 bg-white">
        <Spinner />
      </div>
    </>
  );
}
