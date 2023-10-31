"use client";
import {
  SpinnerStyleTypes,
  TextareaStylesType,
  ThemeProvider,
} from "@material-tailwind/react";
import type {
  ButtonStyleTypes,
  IconButtonStyleTypes,
  InputStylesType,
  SwitchButtonStylesType,
} from "@material-tailwind/react";

export function ThemeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const customTheme: {
    button: ButtonStyleTypes;
    iconButton: IconButtonStyleTypes;
    input: InputStylesType;
    switch: SwitchButtonStylesType;
    spinner: SpinnerStyleTypes;
    textarea: TextareaStylesType;
  } = {
    button: {
      defaultProps: {
        color: "purple",
        ripple: true,
        variant: "gradient",
        className: "!font-poppins",
      },
      styles: {
        variants: {
          filled: {
            purple: {
              backgroud: "bg-primary",
              color: "text-white",
              shadow: "shadow-md shadow-primary/10",
              hover: "hover:shadow-lg hover:primary/20",
              focus: "focus:opacity-[0.85] focus:shadow-none",
              active: "active:opacity-[0.85] active:shadow-none",
            },
          },
          gradient: {},
          outlined: {},
        },
      },
    },
    iconButton: {
      defaultProps: {
        ripple: true,
        variant: "text",
        className: "flex items-center justify-center",
        color: "deep-orange",
        //TODO size, fullwidth
      },
    },

    input: {
      defaultProps: { variant: "outlined", color: "deep-orange" },
    },

    switch: {
      defaultProps: {
        color: "deep-orange",
      },
    },

    spinner: {
      defaultProps: {
        color: "deep-orange",
      },
    },
    textarea: {
      defaultProps: { variant: "outlined", color: "deep-orange" },
    },
  };

  return <ThemeProvider value={customTheme}>{children}</ThemeProvider>;
}
