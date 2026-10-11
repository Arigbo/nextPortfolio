export default function Logo({ className = "" }) {
  return (
    <svg className={`logo-svg ${className}`} viewBox="0 0 180 180" aria-hidden="true">
      <path d="M 50 20 L 130 90 L 50 160" />
      <path d="M 130 20 L 50 90 L 130 160" />
    </svg>
  );
}
