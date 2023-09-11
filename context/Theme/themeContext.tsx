"use client"

import { createContext, useState } from "react";

const ThemeContext = createContext<ThemeContextType>({
  color: "",
  setColor: () => {},
});

export const ThemeContextProvider = ({
  children,
}: ThemeContextProviderProps) => {
  const [color, setColor] = useState("#fb923c");

  return (
    <ThemeContext.Provider value={{ color, setColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
