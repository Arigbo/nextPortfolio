"use client";

import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Context } from "@/components/context";
import Header from "@/components/header";
import Footer from "@/components/footer";

// Register GSAP plugins globally (only once)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ClientLayoutWrapper({ children }) {
  const [theme, setTheme] = useState();
  const themes = [
    { name: "light" },
    { name: "dark" },
    { name: "blue" },
    { name: "forest" },
    { name: "orange" },
    { name: "purple" },
  ];
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") || "blue";
      setTheme(savedTheme);
      localStorage.setItem("theme", savedTheme);
    }
  }, []);

  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    setTheme(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme);
    }
  };

  const name = "Arigbo Jesse";
  const logo = (
    <svg
      className="logo-svg"
      viewBox="0 0 180 180"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M 50 20 L 130 90 L 50 160" />
      <path d="M 130 20 L 50 90 L 130 160" />
    </svg>
  );

  return (
    <body className={theme}>
      <Context.Provider
        value={{
          theme,
          setTheme,
          isContactModalOpen,
          setIsContactModalOpen,
          setIsAboutModalOpen,
          isAboutModalOpen,
        }}
      >
        <Header
          themes={themes}
          logo={logo}
          name={name}
          theme={theme}
          setTheme={setTheme}
          setIsContactModalOpen={setIsContactModalOpen}
          handleThemeChange={handleThemeChange}
          setIsAboutModalOpen={setIsAboutModalOpen}
        />
        {children}
        <Footer name={name} />
      </Context.Provider>
    </body>
  );
}
