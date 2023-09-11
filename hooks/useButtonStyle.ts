type ButtonStyleProps = {
  full?: boolean;
  color?: "primary" | "accent" | "error" | "gray";
  disabled?: boolean;
  text?: "xs" | "sm" | "lg" | "xl";
};

export default function useButtonStyle({
  color,
  disabled,
  full,
  text,
}: ButtonStyleProps) {
  let btnColor: string;
  let textColor: string;
  let shadowColor: string;

  switch (color) {
    case "accent":
      btnColor = "bg-accent";
      textColor = "text-gray-500";
      shadowColor = "hover:shadow-accent/30";
      break;
    case "error":
      btnColor = "bg-red-800";
      textColor = "text-gray-500";
      shadowColor = "hover:shadow-red-800/30";

      break;
    case "gray":
      btnColor = "bg-gray-100";
      textColor = "text-gray-500";
      shadowColor = "hover:shadow-gray-500/30";

      break;
    default:
      btnColor = "bg-gradient-primary";
      textColor = "text-gray-500";
      shadowColor = "hover:shadow-primary/30";

      break;
  }

  return `${btnColor} ${
    color === "gray" ? textColor : "text-white"
  } px-2 py-1 whitespace-nowrap font-bold hover:shadow-lg ${shadowColor} hover:opacity-80 transition-all ease-in-out text-${
    text ? text : "base"
  } ${full ? "w-full h-full" : "rounded-sm"} ${
    disabled && "cursor-not-allowed"
  } ${
    !disabled && !full && "active:scale-95 active:opacity-100"
  } text-center flex items-center justify-center cursor-pointer`;
}
