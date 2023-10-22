import { Header } from "@/app/components/client";
import { Spinner } from "@/app/components/mui";

export default function Loading() {
  return (
    <>
      <Header title="Chat..." />
      <div className="flex items-center justify-center w-full h-full pt-24">
        <Spinner className="w-10 h-10" />
      </div>
    </>
  );
}
