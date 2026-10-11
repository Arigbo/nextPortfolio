import Link from "next/link";

export const metadata = {
  title: "404 — Not Found",
};

export default function NotFound() {
  return (
    <div className="page container">
      <div className="window empty-state">
        <div className="window-bar">
          <span className="dots"><i /><i /><i /></span>
          <span className="window-title">zsh — 404</span>
        </div>
        <div className="window-body">
          <p className="code">
            <span className="tk-prompt">❯</span> cd ./this-page{"\n"}
            <span className="err">cd: no such file or directory</span>{"\n"}
            <span className="tk-com">// the page you were looking for doesn&apos;t exist or has moved.</span>
          </p>
          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
            <Link href="/" className="btn btn-primary">
              <i className="fa-solid fa-house" /> cd ~
            </Link>
            <Link href="/projects" className="btn">
              ls ./projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
