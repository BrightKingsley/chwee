export type ButtonProps = {
  children: React.ReactNode | string;
  onClick?: Function;
  full?: boolean;
  color?: "primary" | "accent" | "error" | "gray";
  text?: "xs" | "sm" | "lg" | "xl";
  disabled?: boolean;
  loading?: boolean;
};
