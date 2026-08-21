// Very quiet decorative backdrop — a traditional Persian eight-point
// star/girih line lattice, rendered at extremely low opacity so it
// reads as texture, not ornament. Used sparingly (hero, roadmap) per
// the "subtle, never literal or busy" rule.
export default function GeometricWeave({
  className = "",
  opacity = 0.05,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ opacity }}
    >
      <defs>
        <pattern
          id="qoqnus-girih"
          width="64"
          height="64"
          patternUnits="userSpaceOnUse"
        >
          <g fill="none" stroke="currentColor" strokeWidth="0.75">
            <path d="M32 2 L48 16 L62 32 L48 48 L32 62 L16 48 L2 32 L16 16 Z" />
            <path d="M32 2 L32 62 M2 32 L62 32" />
            <path d="M16 16 L48 48 M48 16 L16 48" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#qoqnus-girih)" />
    </svg>
  );
}
