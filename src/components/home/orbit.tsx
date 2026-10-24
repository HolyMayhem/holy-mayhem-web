export function Orbit({ className = "" }: { className?: string }) {
  return (
    <div className={`orbit ${className}`} aria-hidden="true">
      <div className="orbit-halo" />
      <svg viewBox="0 0 520 520" fill="none">
        <defs>
          <linearGradient
            id="orbit-color"
            x1="80"
            y1="60"
            x2="430"
            y2="470"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#c4c0f2" stopOpacity=".62" />
            <stop offset=".5" stopColor="#817ab5" stopOpacity=".22" />
            <stop offset="1" stopColor="#7772aa" stopOpacity=".04" />
          </linearGradient>
        </defs>
        <g stroke="url(#orbit-color)" strokeWidth=".8">
          {Array.from({ length: 19 }, (_, i) => (
            <ellipse
              key={i}
              cx="260"
              cy="260"
              rx={45 + i * 9}
              ry="205"
              transform={`rotate(${i * 10} 260 260)`}
            />
          ))}
        </g>
        <ellipse
          cx="260"
          cy="260"
          rx="251"
          ry="62"
          transform="rotate(-29 260 260)"
          stroke="#a59ee2"
          strokeOpacity=".5"
          strokeWidth=".75"
        />
        <circle
          cx="260"
          cy="260"
          r="244"
          stroke="#8b87b0"
          strokeOpacity=".08"
          strokeDasharray="2 8"
        />
        <circle cx="472" cy="139" r="4" fill="#d7d2ff" />
        <path d="M253 260h14m-7-7v14" stroke="#ddd8ff" strokeWidth="1.2" />
      </svg>
      <span className="orbit-coordinate">HM / ∞</span>
    </div>
  );
}
