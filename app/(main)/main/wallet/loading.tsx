import { Header } from "@/app/components/client";
import { Spinner } from "@/app/components/mui";

export default function LoadingWallet() {
  return (
    <>
      <Header title="Wallet..." />
      <div className="flex items-center justify-center w-full h-full bg-white">
        <Spinner className="w-12 h-12" />
      </div>
    </>
  );
}
