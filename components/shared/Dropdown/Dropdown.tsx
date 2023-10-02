import { AnimatePresence, motion } from "framer-motion";
import { DropdownType } from "./types";
import AnimateInOut from "../AnimateInOut";

export default function Dropdown({
  show,
  text,
  actionCancel,
  actionConfirm,
  altConfirm,
}: DropdownType) {
  return (
    <AnimateInOut
      init={{ opacity: 0, y: "-30%", scale: 0.8 }}
      animate={{ opacity: 1, y: "0", scale: 1 }}
      out={{ opacity: 0, y: "-30%", scale: 0.8 }}
      show={show}
      className={
        "bg-body z-20 rounded-md w-fit text-center shadow-md p-2 absolute"
      }
    >
      <p>{text}</p>
      <div className="flex gap-1">
        <div className="">
          <button onClick={() => actionCancel()}>cancel</button>
        </div>
        {!altConfirm ? (
          <div className="">
            <button onClick={() => actionConfirm()}>confirm</button>
          </div>
        ) : (
          altConfirm
        )}
      </div>
    </AnimateInOut>
  );
}
