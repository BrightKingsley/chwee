import { Spinner } from "@/components/mui";

export default function LoadingConnect() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Spinner color="deep-orange" />
    </div>
  );
}
