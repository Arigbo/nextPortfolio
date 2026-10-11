"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSite } from "@/components/context";
import { allProjects } from "@/lib/projectsData";
import { NAV, SITE, SOCIALS, slugOf } from "@/lib/site";

/**
 * VS Code-style command palette: jump to pages and projects, or run quick
 * actions (theme, CV, copy email, socials). Opened with Ctrl/Cmd+K.
 */
export default function CommandPalette({ open, onClose }) {
  const router = useRouter();
  const { theme, toggleTheme } = useSite();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState("");
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const commands = useMemo(() => {
    const go = (href) => () => router.push(href);
    const external = (href) => () => window.open(href, "_blank", "noopener,noreferrer");
    return [
      ...NAV.map((n) => ({
        group: "Go to",
        label: n.label,
        hint: n.file,
        icon: n.icon,
        tone: n.tone,
        keywords: n.href,
        run: go(n.href),
      })),
      { group: "Go to", label: "Community", hint: "about#community", icon: "fa-solid fa-users", tone: "blue", run: go("/about#community") },
      ...allProjects.map((p) => ({
        group: "Projects",
        label: p.title,
        hint: `${slugOf(p.title)}/`,
        icon: "fa-solid fa-folder",
        tone: "yellow",
        keywords: p.techStack.join(" "),
        run: go(`/projects/${p.id}`),
      })),
      {
        group: "Actions",
        label: theme === "dark" ? "Switch to light theme" : "Switch to dark theme",
        hint: "theme",
        icon: theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon",
        tone: "purple",
        keepOpen: true,
        run: toggleTheme,
      },
      {
        group: "Actions",
        label: "Copy email address",
        hint: SITE.email,
        icon: "fa-regular fa-copy",
        tone: "green",
        keepOpen: true,
        run: async () => {
          try {
            await navigator.clipboard.writeText(SITE.email);
            setToast("Email copied to clipboard");
          } catch {
            setToast(SITE.email);
          }
        },
      },
      {
        group: "Actions",
        label: "Download CV",
        hint: "Resume.pdf",
        icon: "fa-solid fa-file-arrow-down",
        tone: "green",
        run: () => {
          const a = document.createElement("a");
          a.href = SITE.resume;
          a.download = "";
          a.click();
        },
      },
      ...SOCIALS.map((s) => ({
        group: "Links",
        label: `Open ${s.label}`,
        hint: s.handle,
        icon: s.icon,
        tone: "blue",
        run: external(s.href),
      })),
    ];
  }, [router, theme, toggleTheme]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) =>
      `${c.label} ${c.hint} ${c.group} ${c.keywords ?? ""}`.toLowerCase().includes(q)
    );
  }, [commands, query]);

  // Reset when opened; focus the input
  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActive(0);
    setToast("");
    const t = setTimeout(() => inputRef.current?.focus(), 10);
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => setActive(0), [query]);

  // Keep the highlighted row in view
  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  if (!open) return null;

  const run = (cmd) => {
    cmd.run();
    if (!cmd.keepOpen) onClose();
  };

  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      run(results[active]);
    }
  };

  let lastGroup = null;

  return (
    <div className="palette-backdrop" onMouseDown={onClose}>
      <div
        className="palette window"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onMouseDown={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <div className="palette-input-row">
          <span className="tk-prompt">❯</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search…"
            aria-label="Search commands"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={results[active] ? `cmd-${active}` : undefined}
            spellCheck={false}
            autoComplete="off"
          />
          <kbd>esc</kbd>
        </div>

        <ul className="palette-list" id="palette-list" role="listbox" ref={listRef}>
          {results.length === 0 && (
            <li className="palette-empty">
              <span className="tk-kw">zsh:</span> command not found: {query}
            </li>
          )}
          {results.map((cmd, i) => {
            const header = cmd.group !== lastGroup ? cmd.group : null;
            lastGroup = cmd.group;
            return (
              <li key={`${cmd.group}-${cmd.label}`} role="presentation">
                {header && <p className="palette-group">{header}</p>}
                <button
                  id={`cmd-${i}`}
                  data-index={i}
                  role="option"
                  aria-selected={i === active}
                  className={`palette-item ${i === active ? "active" : ""}`}
                  onMouseMove={() => setActive(i)}
                  onClick={() => run(cmd)}
                >
                  <i className={`${cmd.icon} tone-${cmd.tone}`} aria-hidden="true" />
                  <span className="palette-label">{cmd.label}</span>
                  <span className="palette-hint">{cmd.hint}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="palette-foot">
          {toast ? (
            <span className="accent"><i className="fa-solid fa-check" /> {toast}</span>
          ) : (
            <>
              <span><kbd>↑</kbd> <kbd>↓</kbd> navigate</span>
              <span><kbd>↵</kbd> run</span>
              <span><kbd>esc</kbd> close</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
