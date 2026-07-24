const PARTICLE_COUNT = 24;

// Deterministic pseudo-random values (same on server and client) so no
// client-only effect is needed and there's no hydration mismatch.
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

// Rounded to 2 decimals: full float precision serializes differently
// between the server's string render and the browser's style-attribute
// normalization, which otherwise trips a hydration mismatch warning.
function round(value: number): number {
  return Math.round(value * 100) / 100;
}

const particles = Array.from({ length: PARTICLE_COUNT }, (_, id) => ({
  id,
  left: round(pseudoRandom(id * 1.7) * 100),
  size: round(2 + pseudoRandom(id * 3.1) * 3),
  delay: round(pseudoRandom(id * 5.3) * 12),
  duration: round(12 + pseudoRandom(id * 7.9) * 8),
}));

export default function HeroParticles() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle absolute rounded-full bg-gold-500"
          style={
            {
              left: `${p.left}%`,
              bottom: 0,
              width: p.size,
              height: p.size,
              "--pf-duration": `${p.duration}s`,
              "--pf-delay": `${p.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
