export default function Header({
  name,
  logo,
  handleThemeChange,
  theme,
  setIsAboutModalOpen,
  setIsContactModalOpen,
}) {
  return (
    <header>
      <div>{logo}</div>
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
        <select
          onChange={handleThemeChange}
          value={theme}
          className="theme-select"
        >
          <option value="blue">Blue</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="forest">Forest</option>
          <option value="purple">Purple</option>
          <option value="orange">Orange</option>
        </select>
        <button
          onClick={() => {
            setIsContactModalOpen(true);
          }}
          className="talk-button gradient-button"
        >
          Let's Talk
        </button>
      </div>
    </header>
  );
}
