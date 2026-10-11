"use client";
import { createContext, useContext } from "react";

export const Context = createContext({
  theme: "dark",
  toggleTheme: () => {},
  openPalette: () => {},
});

export const useSite = () => useContext(Context);
