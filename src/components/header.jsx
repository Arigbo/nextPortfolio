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
  const switcherRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (switcherRef.current && !switcherRef.current.contains(event.target)) {
        setSelectTheme(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const nav = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Projects", link: "/projects" },
    { name: "Contact", link: "/contact" },
  ];
  const path = usePathname();
  
  return (
    <header>
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
                  style={{
                    fontWeight: isActive ? "700" : "500",
                    color: isActive ? "var(--accent-color)" : "inherit"
                  }}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>
        
        <div className="header-right">
          <div className="theme-select-container" ref={switcherRef}>
            <button 
              className="theme-trigger-button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectTheme(!selectTheme);
              }}
              aria-label="Change theme"
            >
              <i className="fa-solid fa-palette theme-icon"></i>
              <span className="theme-name">{theme}</span>
              <i className={`fa-solid fa-chevron-down arrow-icon ${selectTheme ? "rotate" : ""}`}></i>
            </button>
            
            {selectTheme && (
              <div className="theme-options-dropdown">
                {themes.map((item) => (
                  <button
                    key={item.name}
                    className={`theme-option ${theme === item.name ? "active" : ""}`}
                    onClick={() => {
                      setTheme(item.name);
                      handleThemeChange({ target: { value: item.name } });
                      setSelectTheme(false);
                    }}
                  >
                    <span className={`theme-dot ${item.name}`} />
                    <span className="option-name">{item.name}</span>
                    {theme === item.name && <i className="fa-solid fa-check check-icon" />}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <Link href="/contact" style={{ display: "flex" }}>
            <button className="talk-button gradient-button" style={{ paddingInline: "1.2rem", height: "2.2rem" }}>
              Let's Talk
            </button>
          </Link>

          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <i className="fa-solid fa-bars-staggered"></i>
          </button>
        </div>
      </div>
      
      {/* Mobile Drawer */}
      <div
        className={`menu-overlay ${isMenuOpen ? "show" : ""}`}
        onClick={() => {
          setIsMenuOpen(false);
        }}
      >
        <div className="menu" onClick={(e) => e.stopPropagation()}>
          <button className="close-menu" style={{ background: "transparent", border: "0", color: "inherit", alignSelf: "flex-end", padding: "0.5rem" }} onClick={() => setIsMenuOpen(false)}>
            <i className="fas fa-times fa-lg"></i>
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
