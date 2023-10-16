import {} from "react";

const SMALL_CONTAINER = "w-8 h-8";
const SMALL_CHILD = "w-4 h-4";
const SMALL_PSUEDO = "before:w-4 before:h-4 after:w-4 after:h-4";

const MEDIUM = "w-12 h-12";
const MEDIUM_CHILD = "w-6 h-6";
const MEDIUM_PSUEDO = "before:w-6 before:h-6 after:w-6 after:h-6";

const LARGE = "w-16 h-16";
const LARGE_CHILD = "w-8 h-8";
const LARGE_PSUEDO = "before:w-8 before:h-8 after:w-8 after:h-8";

const PRIMARY_PSUEDO = "before:bg-gradient-primary after:bg-gradient-primary";
const BODY_PSUEDO = "before:bg-body after:bg-body";

export default function Spinner({
  color,
  size,
}: {
  color?: "primary" | "body";
  size?: "small" | "medium" | "large";
}) {
  let spinSize;
  let childSize;
  switch (size) {
    case "small":
      spinSize = `${SMALL_CONTAINER} ${SMALL_PSUEDO}`;
      childSize = SMALL_CHILD;
      break;

    case "medium":
      spinSize = `${MEDIUM} ${MEDIUM_PSUEDO}`;
      childSize = MEDIUM_CHILD;
      break;

    case "large":
      spinSize = `${LARGE} ${LARGE_PSUEDO}`;
      childSize = LARGE_CHILD;
      break;

    default:
      spinSize = `${MEDIUM} ${MEDIUM_PSUEDO}`;
      childSize = MEDIUM_CHILD;
      break;
  }

  let spinColor;
  let childColor;
  switch (color) {
    case "primary":
      spinColor = `${PRIMARY_PSUEDO}`;
      childColor = "bg-gradient-primary";
      break;

    case "body":
      spinColor = `${BODY_PSUEDO}`;
      childColor = "bg-body";

      break;

    default:
      spinColor = `${PRIMARY_PSUEDO}`;
      childColor = "bg-gradient-primary";
      break;
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className={`z-10 mx-auto animate-spin flex justify-center ${spinSize} ${spinColor} before:absolute before:rounded-full before:-bottom-0 before:-left-[0.1rem] after:absolute after:rounded-full after:-bottom-0 after:-right-[0.1rem]`}
      >
        <div
          className={`absolute ${childSize} -top-[0.1rem] rounded-full ${childColor} `}
        />
      </div>
    </div>
  );
}
