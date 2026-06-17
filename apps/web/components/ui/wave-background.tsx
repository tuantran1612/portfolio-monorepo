"use client";

export function WaveBackground() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="wave-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.06" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      {Array.from({ length: 18 }).map((_, i) => {
        const y = 200 + i * 38;
        const amplitude = 60 + i * 8;
        const freq = 0.003 + i * 0.0002;
        const phase = i * 0.4;
        const points = Array.from({ length: 60 }, (_, j) => {
          const x = j * 24;
          const yOffset = Math.sin(x * freq + phase) * amplitude;
          return `${x},${y + yOffset}`;
        }).join(" ");
        return (
          <polyline
            key={i}
            points={points}
            fill="none"
            stroke="url(#wave-fade)"
            strokeWidth="0.8"
            opacity={0.6 - i * 0.02}
          />
        );
      })}
    </svg>
  );
}
