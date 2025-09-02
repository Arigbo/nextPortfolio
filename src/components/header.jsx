import { useState } from "react";

export default function Header({
  name,
  logo,
  handleThemeChange,
  theme,
  setTheme,
  setIsAboutModalOpen,
  setIsContactModalOpen,
}) {
  const [selectTheme, setSelectTheme] = useState();
  const themes = [
    { name: "light" },
    { name: "dark" },
    { name: "forest" },
    { name: "orange" },
    { name: "purple" },
  ];
  return (
    <header>
      <div className="headerInner">
        <div className="logo">
          <h1>{logo}</h1>
        </div>
        <nav className="nav">
          <div className="nav-items">
            <a href="#projects" className="nav-link underline-hover">
              <span>Projects</span>
            </a>
            <a
              href="#about"
              onClick={() => {
                setIsAboutModalOpen(true);
              }}
              className="nav-link underline-hover"
            >
              <span>About</span>
            </a>
            <a
              onClick={() => {
                setIsContactModalOpen(true);
              }}
              className="nav-link underline-hover"
            >
              <span>Contact</span>
            </a>
          </div>
        </nav>
        <div className="header-right">
          <ul className="theme-select">
            <div className={`themes ${selectTheme ? "show" : ""}`}>
              {themes.map((item) => {
                return (
                  <li
                    onClick={() => {
                      setTheme(item.name);
                    }}
                    key={item.name}
                    className={theme == item.name ? "hide" : item.name}
                  >
                    {item.name}
                  </li>
                );
              })}
            </div>
           {selectTheme? <li
              className="active"
              onClick={() => {
                setSelectTheme(false);
              }}
            >
              {theme} <i className="fas fa-chevron-down"></i>
            </li>: <li
              className="active"
              onClick={() => {
                setSelectTheme(true);
              }}
            >
              {theme} <i className="fas fa-chevron-up"></i>
            </li>}
          </ul>
          <button
            onClick={() => {
              setIsContactModalOpen(true);
            }}
            className="talk-button gradient-button"
          >
            Let's Talk
          </button>
        </div>
      </div>
    </header>
  );
}
