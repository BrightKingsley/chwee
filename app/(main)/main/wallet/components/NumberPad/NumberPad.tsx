import { AnimateInOut } from "@/components/shared";
import { useLongPress } from "@/hooks";
import BackspaceOutlined from "@mui/icons-material/BackspaceOutlined";
import { Button } from "@/components/mui";

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
export default function NumberPad({
  showAmountModal,
  valueInput,
  setValueInput,
}: {
  showAmountModal: boolean;
  valueInput: string;
  setValueInput: React.Dispatch<React.SetStateAction<string>>;
}) {
  const gestures = useLongPress({
    callback: () => setValueInput("0"),
    duration: 800,
  });

  return (
    <AnimateInOut
      init={{ translateY: "100%" }}
      out={{ translateY: "100%" }}
      show={showAmountModal}
      animate={{ translateY: 0 }}
      transition={{ type: "keyframes" }}
      className="fixed top-[40%] flex flex-col left-0 space-y-2 bg-body rounded-t-3xl h-[60%] overflow-y-auto mx-auto w-full"
    >
      <div className="bg-gray-300 rounded-full w-1/3 h-1 mx-auto my-3" />
      <div className="grid gap-4 px-2 pb-2 grid-cols-3 grid-rows-4 flex-1 shrink-0">
        {numbers.map((number) => (
          <Button
            variant="text"
            key={number}
            onClick={() => {
              !(valueInput === "0" && number === 0) &&
                setValueInput((prev) => {
                  return valueInput !== "0"
                    ? (prev += number)
                    : number.toString();
                });
            }}
            className="p-2 aspect-video_ aspect-[4/2]_ row-span-1 text-3xl rounded-2xl border"
          >
            {number}
          </Button>
        ))}
        <Button
          variant="text"
          className="p-2 rounded-2xl border aspect-video_ aspect-[4/2]_ row-span-1 text-3xl"
        >
          .
        </Button>
        {/* @ts-ignore */}
        <Button
          variant="text"
          {...gestures}
          onClick={() => {
            if (valueInput !== "0") {
              console.log("DELETE ALL");

              setValueInput((prev) =>
                prev !== "0"
                  ? prev.replace(prev.charAt(prev.length - 1), "")
                  : "0"
              );
            }
          }}
          className="p-2 aspect-video_ aspect-[4/2]_ row-span-1 text-3xl rounded-2xl border flex items-center justify-center"
        >
          <BackspaceOutlined className="w-8 h-8" />
        </Button>
      </div>
    </AnimateInOut>
  );
}
