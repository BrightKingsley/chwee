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
        // @ts-ignore
        color: "indigo",
        ripple: true,
        variant: "gradient",
        className: "!font-poppins",
      },
      styles: {
        variants: {
          filled: {
            indigo: {
              background: "bg-primary",
              color: "text-white",
              shadow: "shadow-md shadow-primary/10",
              hover: "hover:shadow-lg hover:primary/20",
              focus: "focus:opacity-[0.85] focus:shadow-none",
              active: "active:opacity-[0.85] active:shadow-none",
            },
          },
          outlined: {
            indigo: {
              background: "outline-primary",
              color: "text-primary",
              shadow: "shadow-none",
              hover: "",
              focus: "",
              active: "",
            },
          },
          gradient: {},
        },
      },
    },
    iconButton: {
      defaultProps: {
        ripple: true,
        variant: "text",
        className: "flex items-center justify-center",
        // @ts-ignore
        color: "indigo",
        //TODO size, fullwidth
      },
      styles: {
        variants: {
          filled: {
            indigo: {
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
      // @ts-ignore
      defaultProps: { variant: "outlined", color: "indigo" },
    },

    switch: {
      defaultProps: {
        // @ts-ignore
        color: "indigo",
      },
    },

    spinner: {
      defaultProps: {
        // @ts-ignore
        color: "indigo",
      },
    },
    textarea: {
      // @ts-ignore
      defaultProps: { variant: "outlined", color: "indigo" },
    },
  };

  return <ThemeProvider value={customTheme}>{children}</ThemeProvider>;
}
