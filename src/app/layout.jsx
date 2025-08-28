"use client";
import { Context } from "@/components/context";
import Footer from "@/components/footer";
import Header from "@/components/header";
import "@/styles/globals.scss";
import { useEffect, useState } from "react";
export default function RootLayout({ children }) {
  const [theme, setTheme] = useState("");
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") || "blue";
      setTheme(savedTheme);

      const root = document.documentElement;
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
  const logo = <div className="logo">LD</div>;
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Chivo:ital,wght@0,100..900;1,100..900&family=Funnel+Display:wght@300..800&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap" rel="stylesheet"/>
      </head>
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
            logo={logo}
            name={name}
            theme={theme}
            setIsContactModalOpen={setIsContactModalOpen}
            handleThemeChange={handleThemeChange}
            setIsAboutModalOpen={setIsAboutModalOpen}
          ></Header>
          {children}
          <Footer name={name}></Footer>
        </Context.Provider>
      </body>
    </html>
  );
}
