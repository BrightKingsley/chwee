import React from "react";
import useButtonStyle from "@/hooks/useButtonStyle";
import Spinner from "../Spinner";
import { ButtonProps } from "./types";

const Button = ({
  children,
  onClick,
  full,
  color,
  text,
  disabled,
  loading,
}: ButtonProps) => {
  const btnStyles = useButtonStyle({
    full,
    color,
    text,
    disabled: disabled !== undefined && disabled,
  });

  return (
    <button
      onClick={() => onClick && onClick()}
      disabled={disabled}
      className={btnStyles}
    >
      {loading ? <Spinner size="small" color="body" /> : children}
    </button>
  );
};

export default Button;
