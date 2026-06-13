import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function Header({
  name,
  logo,
  handleThemeChange,
  theme,
  setTheme,
  setIsContactModalOpen,
  themes,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectTheme, setSelectTheme] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const switcherRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (switcherRef.current && !switcherRef.current.contains(event.target)) {
        setSelectTheme(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const nav = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Projects", link: "/projects" },
    { name: "Contact", link: "/contact" },
  ];
  const path = usePathname();

  // Find current theme accent for the live swatch preview
  const currentThemeData = themes.find((t) => t.name === theme);

  return (
    <header className={scrolled ? "scrolled" : ""}>
      <div className="headerInner">
        <Link href="/" className="logo">
          <h1>{logo}</h1>
        </Link>

        <nav className="nav">
          <div className="nav-items">
            {nav.map((item) => {
              const isActive = path === item.link;
              return (
                <Link
                  key={item.name}
                  href={item.link}
                  className={`nav-link underline-hover ${isActive ? "active" : ""}`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="header-right">
          {/* ── Theme Switcher ── */}
          <div className="theme-select-container" ref={switcherRef}>
            <button
              className="theme-trigger-button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectTheme(!selectTheme);
              }}
              aria-label="Change theme"
              aria-expanded={selectTheme}
            >
              {/* Live accent swatch */}
              <span
                className={`theme-dot theme-swatch-preview ${theme}`}
              />
              <span className="theme-label-text">
                {currentThemeData?.label || theme}
              </span>
              <i
                className={`fa-solid fa-chevron-down arrow-icon ${
                  selectTheme ? "rotate" : ""
                }`}
              />
            </button>

            {selectTheme && (
              <div className="theme-options-dropdown" role="listbox">
                <p className="theme-dropdown-header">Choose Theme</p>
                <div className="theme-options-grid">
                  {themes.map((item) => (
                    <button
                      key={item.name}
                      role="option"
                      aria-selected={theme === item.name}
                      className={`theme-option ${
                        theme === item.name ? "active" : ""
                      }`}
                      onClick={() => {
                        setTheme(item.name);
                        handleThemeChange({ target: { value: item.name } });
                        setSelectTheme(false);
                      }}
                    >
                      <span className={`theme-dot ${item.name}`} />
                      <span className="option-name">
                        {item.label || item.name}
                      </span>
                      <i className="fa-solid fa-check option-check" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── CTA Button ── */}
          <Link href="/contact" style={{ display: "flex" }}>
            <button
              className="talk-button gradient-button"
              id="header-lets-talk-btn"
            >
              <i className="fa-solid fa-bolt" style={{ marginRight: "0.35rem", fontSize: "0.75rem" }} />
              Let's Talk
            </button>
          </Link>

          {/* ── Mobile menu toggle ── */}
          <button
            className="menu-toggle"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <i className="fa-solid fa-bars-staggered" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`menu-overlay ${isMenuOpen ? "show" : ""}`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div className="menu" onClick={(e) => e.stopPropagation()}>
          <button
            className="close-menu"
            style={{
              background: "transparent",
              border: "0",
              color: "inherit",
              alignSelf: "flex-end",
              padding: "0.5rem",
            }}
            onClick={() => setIsMenuOpen(false)}
          >
            <i className="fas fa-times fa-lg" />
          </button>
          {nav.map((item) => (
            <Link
              key={item.name}
              href={item.link}
              onClick={() => setIsMenuOpen(false)}
              className={path === item.link ? "active" : ""}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
