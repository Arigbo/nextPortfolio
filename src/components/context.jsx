"use client";
import { createContext } from "react";

export const Context = createContext({
  theme: "",
  setTheme: () => {},
  isContactModalOpen: () => {},
  setIsContactModalOpen: () => {},
  isAboutModalOpen: () => {},
  setIsAboutModalOpen: () => {},
});
