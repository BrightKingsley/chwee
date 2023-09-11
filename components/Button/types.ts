export type ButtonProps = {
  children: React.ReactNode;
  onClick?: Function;
  full?: boolean;
  color?: "primary" | "accent" | "error" | "gray";
  text?: "xs" | "sm" | "lg" | "xl";
  disabled?: boolean;
  loading?: boolean;
};
