"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSite } from "@/components/context";
import Logo from "@/components/Logo";
import { NAV, SITE, isActive } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const { theme, toggleTheme, openPalette } = useSite();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent));
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation, and lock scroll while it's open
  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const themeLabel = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="header-inner container">
        <Link href="/" className="brand" aria-label={`${SITE.name} — home`}>
          <Logo />
          <span className="brand-path">
            <span className="tk-prompt">~/</span>{SITE.handle}
            <span className="brand-branch"> git:(<span>main</span>)</span>
          </span>
        </Link>

        <nav className="tabs" aria-label="Main">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`tab ${isActive(pathname, item.href) ? "active" : ""}`}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
            >
              <i className={`${item.icon} tone-${item.tone}`} aria-hidden="true" />
              {item.file}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <button className="search-trigger" onClick={openPalette} aria-label="Open command palette">
            <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
            <span className="search-trigger-text">Search…</span>
            <kbd>{isMac ? "⌘" : "Ctrl"} K</kbd>
          </button>

          <button className="icon-btn" onClick={toggleTheme} aria-label={themeLabel} title={themeLabel}>
            <i className={theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon"} aria-hidden="true" />
          </button>

          <button
            className="icon-btn menu-btn"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <i className={menuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Mobile menu — a little shell session */}
      <div id="mobile-menu" className={`mobile-menu ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu-inner container">
          <p className="mobile-menu-cmd"><span className="tk-prompt">❯</span> ls ~/</p>
          {NAV.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className={`mobile-link ${isActive(pathname, item.href) ? "active" : ""}`}
              style={{ "--i": i }}
              tabIndex={menuOpen ? 0 : -1}
            >
              <i className={`${item.icon} tone-${item.tone}`} aria-hidden="true" />
              <span>{item.label}</span>
              <span className="mobile-link-file">{item.file}</span>
            </Link>
          ))}
          <div className="mobile-menu-foot">
            <button className="btn btn-ghost" onClick={() => { setMenuOpen(false); openPalette(); }} tabIndex={menuOpen ? 0 : -1}>
              <i className="fa-solid fa-magnifying-glass" /> Search
            </button>
            <Link href="/contact" className="btn btn-primary" tabIndex={menuOpen ? 0 : -1}>
              Let's talk <i className="fa-solid fa-arrow-right" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
