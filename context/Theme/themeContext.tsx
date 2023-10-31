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
              background: "bg-primary",
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
        color: "purple",
        //TODO size, fullwidth
      },
      styles: {
        variants: {
          filled: {
            purple: {
              background: "bg-primary",
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

    input: {
      defaultProps: { variant: "outlined", color: "purple" },
    },

    switch: {
      defaultProps: {
        color: "purple",
      },
    },

    spinner: {
      defaultProps: {
        color: "purple",
      },
    },
    textarea: {
      defaultProps: { variant: "outlined", color: "purple" },
    },
  };

  return <ThemeProvider value={customTheme}>{children}</ThemeProvider>;
}
