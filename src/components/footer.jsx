"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";
import { NAV, SITE, SOCIALS } from "@/lib/site";

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="site-footer">
      {/* CTA — redundant on the contact page itself */}
      {pathname !== "/contact" && (
        <div className="container">
          <div className="footer-cta window">
            <div className="window-bar">
              <span className="dots"><i /><i /><i /></span>
              <span className="window-title">~/{SITE.handle} — zsh</span>
            </div>
            <div className="window-body footer-cta-body">
              <div>
                <p className="footer-cta-cmd">
                  <span className="tk-prompt">❯</span> echo <span className="tk-str">"have a project in mind?"</span>
                </p>
                <h2 className="footer-cta-title">Let's build something great together.</h2>
              </div>
              <Link href="/contact" className="btn btn-primary">
                ./contact.sh <i className="fa-solid fa-arrow-right" />
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="container footer-grid">
        <div className="footer-brand">
          <Link href="/" className="brand">
            <Logo />
            <span className="brand-path"><span className="tk-prompt">~/</span>{SITE.handle}</span>
          </Link>
          <p className="footer-blurb">
            {SITE.role} building fast, scalable web products with Next.js, Node.js and the cloud.
          </p>
          <span className="status live pulse">available for new projects</span>
        </div>

        <nav className="footer-col" aria-label="Footer">
          <p className="footer-col-title">// navigate</p>
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="footer-link">{n.label}</Link>
          ))}
        </nav>

        <div className="footer-col">
          <p className="footer-col-title">// connect</p>
          {SOCIALS.slice(0, 3).map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="footer-link">
              <i className={s.icon} aria-hidden="true" /> {s.label}
            </a>
          ))}
          <a href={`mailto:${SITE.email}`} className="footer-link">
            <i className="fa-solid fa-envelope" aria-hidden="true" /> Email
          </a>
        </div>

        <div className="footer-col">
          <p className="footer-col-title">// resources</p>
          <a href={SITE.resume} download className="footer-link">
            <i className="fa-solid fa-file-arrow-down" aria-hidden="true" /> Download CV
          </a>
          <Link href="/about#community" className="footer-link">
            <i className="fa-solid fa-users" aria-hidden="true" /> Community
          </Link>
        </div>
      </div>

      {/* Editor-style status bar */}
      <div className="status-bar">
        <div className="container status-bar-inner">
          <div className="status-left">
            <span className="sb-item sb-branch"><i className="fa-solid fa-code-branch" aria-hidden="true" /> main</span>
            <span className="sb-item"><i className="fa-regular fa-circle-check" aria-hidden="true" /> 0 problems</span>
            <span className="sb-item sb-hide-sm">Next.js · React</span>
          </div>
          <div className="status-right">
            <span className="sb-item">© {new Date().getFullYear()} {SITE.name}</span>
            <span className="sb-item sb-hide-sm">UTF-8</span>
            <a href="#top" className="sb-item sb-link" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0 }); }}>
              <i className="fa-solid fa-arrow-up" aria-hidden="true" /> top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
