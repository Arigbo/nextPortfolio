import { useState } from "react";

export default function Header({
  name,
  logo,
  handleThemeChange,
  theme,
  setTheme,
  setIsContactModalOpen,
  themes,
  selectTheme,
  setSelectTheme,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const nav = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Projects", link: "#projects" },
    { name: "Contact", link: "#contact" },
  ];
  const path = window.location.pathname;
  return (
    <header>
      <div className="headerInner">
        <div
          className="logo"
          onClick={() => {
            setIsMenuOpen(true);
          }}
        >
          <h1>{logo}</h1>
        </div>
        <nav className="nav">
          <div className="nav-items">
            {nav.map((item) => {
              return (
                <a
                  key={item.name}
                  href={item.link}
                  className={`nav-link underline-hover ${
                    path === item.link ? "active" : ""
                  }`}
                >
                  {item.name}
                </a>
              );
            })}
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
                      handleThemeChange({ target: { value: item.name } });
                    }}
                    key={item.name}
                    className={theme == item.name ? "hide" : item.name}
                  >
                    {item.name}
                  </li>
                );
              })}
            </div>
            {selectTheme ? (
              <li
                className="active"
                onClick={() => {
                  setSelectTheme(false);
                }}
              >
                {theme} <i className="fas fa-chevron-down"></i>
              </li>
            ) : (
              <li
                className="active"
                onClick={() => {
                  setSelectTheme(true);
                }}
              >
                {theme} <i className="fas fa-chevron-up"></i>
              </li>
            )}
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
      <div
        className={`menu-overlay ${isMenuOpen ? "show" : ""}`}
        onClick={() => {
          setIsMenuOpen(false);
        }}
      >
        <div className="menu">
          {" "}
          <a href="/">Home</a>
          <a href="/">Projects</a>
          <a href="/about">About</a>
          <a href="/">Contact</a>
        </div>
      </div>
    </header>
  );
}
