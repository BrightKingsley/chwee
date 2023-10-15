import Image from "next/image";

interface OfflineProps {
  message: string;
}

const OfflinePage: React.FC<OfflineProps> = ({ message }) => {
  return (
    <div className="w-screen h-screen bg-brand-lightblue relative flex items-center justify-center">
      <div className="text-center">
        <h1>{message}</h1>
        <p>Please check your internet connection and try again.</p>
      </div>
      <Image
        src="/images/pattern.svg"
        alt=""
        width={80}
        height={80}
        className="absolute w-full h-full top-0 left-0"
      />
    </div>
  );
};

export default OfflinePage;
