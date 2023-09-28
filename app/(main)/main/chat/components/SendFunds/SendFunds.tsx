import { AnimateInOut } from "@/components";

export default function SendFunds({
  setToggleTransferForm,
  toggleTransferForm,
}: {
  toggleTransferForm: boolean;
  setToggleTransferForm: React.Dispatch<React.SetStateAction<boolean>>;
}): React.ReactNode {
  return (
    <AnimateInOut
      init={{ opacity: 0, translateY: 80, scale: 0 }}
      animate={{ opacity: 1, translateY: 0, scale: 1 }}
      out={{ opacity: 0, translateY: 80, scale: 0 }}
      show={toggleTransferForm}
      className="absolute space-y-4 p-2 bottom-[100%] bg-white rounded-xl mx-4 md:mx-16 text-center z-40"
    >
      <p>Enter the amount You want to transfer</p>
      <input
        type="number"
        className="w-full p-3 text-3xl text-gray-700 border rounded-md outline-none resize-none bg-primary/20 border-primary_ focus:outline-primary"
      />

      <div className="flex justify-around w-full">
        <button onClick={() => setToggleTransferForm(false)}>cancel</button>{" "}
        <button>confirm</button>
      </div>
    </AnimateInOut>
  );
}
