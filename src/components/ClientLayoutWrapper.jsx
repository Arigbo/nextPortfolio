"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Context } from "@/components/context";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CommandPalette from "@/components/CommandPalette";

export default function ClientLayoutWrapper({ children }) {
  const [theme, setTheme] = useState("dark");
  const [paletteOpen, setPaletteOpen] = useState(false);

  // The inline script in layout.jsx already applied the theme; sync React state to it
  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      try { localStorage.setItem("theme", next); } catch {}
      return next;
    });
  }, []);

  const openPalette = useCallback(() => setPaletteOpen(true), []);

  // Ctrl/Cmd + K opens the command palette from anywhere
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <body>
      <Context.Provider value={{ theme, toggleTheme, openPalette }}>
        <a href="#main" className="skip-link">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      </Context.Provider>
    </body>
  );
}
