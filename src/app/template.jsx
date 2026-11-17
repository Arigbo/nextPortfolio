/**
 * Templates re-mount on every navigation (unlike layouts), so this wrapper's
 * CSS entrance plays each time you move between pages. See `.page-enter`.
 */
export default function Template({ children }) {
  return <div className="page-enter">{children}</div>;
}
