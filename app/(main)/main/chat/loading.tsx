import { Header } from "@/components/shared";
import { Spinner } from "@/components/mui";

export default function Loading() {
  return (
    <>
      <Header title="Chat..." />
      <div className="flex items-center justify-center w-full h-full bg-white">
        <Spinner />
      </div>
    </>
  );
}
