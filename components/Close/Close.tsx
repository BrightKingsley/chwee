import { CloseType } from "./types";
import { XMarkIcon} from "@heroicons/react/20/solid";

const Close = ({ close }: CloseType) => {
  return (
    <button
      className={
        "bg-body rounded-full text-3xl  active:scale-90 transition-all duration-150 hover:scale-110"
      }
      onClick={() => close()}
      title="close"
    >
      <XMarkIcon className="w-10 h-10 text-gray-600" />
    </button>
  );
};

export default Close;
