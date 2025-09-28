import { memo } from 'react';

const AutoPartsBackdrop = memo(() => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none autoparts-backdrop" aria-hidden="true">
      {/* Background overlay for contrast */}
      <div className="absolute inset-0 bg-black/40 z-10" />
      
      {/* Animated industrial parts */}
      <svg
        className="absolute inset-0 w-full h-full z-0"
        viewBox="0 0 1920 1080"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Gears - Large rotating */}
        <g className="gear-large opacity-20" style={{ animation: 'gear-rotate 20s linear infinite' }}>
          <circle
            cx="150"
            cy="200"
            r="80"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-amber/30"
          />
          {/* Gear teeth */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30) * (Math.PI / 180);
            const x1 = 150 + Math.cos(angle) * 75;
            const y1 = 200 + Math.sin(angle) * 75;
            const x2 = 150 + Math.cos(angle) * 85;
            const y2 = 200 + Math.sin(angle) * 85;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="currentColor"
                strokeWidth="3"
                className="text-amber/40"
              />
            );
          })}
          <circle cx="150" cy="200" r="15" stroke="currentColor" strokeWidth="2" fill="none" className="text-amber/50" />
        </g>

        {/* Medium gear - Counter rotating */}
        <g className="gear-medium opacity-30" style={{ transformOrigin: '1400px 300px', animation: 'gear-counter 15s linear infinite' }}>
          <circle
            cx="1400"
            cy="300"
            r="60"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-red/30"
          />
          {/* Gear teeth */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 45) * (Math.PI / 180);
            const x1 = 1400 + Math.cos(angle) * 55;
            const y1 = 300 + Math.sin(angle) * 55;
            const x2 = 1400 + Math.cos(angle) * 65;
            const y2 = 300 + Math.sin(angle) * 65;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="currentColor"
                strokeWidth="3"
                className="text-red/40"
              />
            );
          })}
          <circle cx="1400" cy="300" r="12" stroke="currentColor" strokeWidth="2" fill="none" className="text-red/50" />
        </g>

        {/* Bolts - Floating */}
        <g className="bolt-group opacity-25" style={{ animation: 'drift-slow 25s ease-in-out infinite' }}>
          {/* Hex bolt head */}
          <polygon
            points="800,150 820,160 820,180 800,190 780,180 780,160"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-amber/40"
          />
          {/* Bolt thread */}
          <rect x="795" y="190" width="10" height="40" stroke="currentColor" strokeWidth="2" fill="none" className="text-amber/30" />
          {/* Thread lines */}
          <line x1="795" y1="200" x2="805" y2="200" stroke="currentColor" strokeWidth="1" className="text-amber/30" />
          <line x1="795" y1="210" x2="805" y2="210" stroke="currentColor" strokeWidth="1" className="text-amber/30" />
          <line x1="795" y1="220" x2="805" y2="220" stroke="currentColor" strokeWidth="1" className="text-amber/30" />
        </g>

        {/* Washers - Drifting */}
        <g className="washer-group opacity-35" style={{ animation: 'drift-gentle 18s ease-in-out infinite' }}>
          <circle cx="1200" cy="700" r="25" stroke="currentColor" strokeWidth="2" fill="none" className="text-red/30" />
          <circle cx="1200" cy="700" r="15" stroke="currentColor" strokeWidth="1" fill="none" className="text-red/40" />
        </g>

        <g className="washer-group-2 opacity-30" style={{ animation: 'drift-reverse 22s ease-in-out infinite' }}>
          <circle cx="300" cy="800" r="20" stroke="currentColor" strokeWidth="2" fill="none" className="text-amber/30" />
          <circle cx="300" cy="800" r="12" stroke="currentColor" strokeWidth="1" fill="none" className="text-amber/40" />
        </g>

        {/* Small bolts scattered */}
        <g className="small-bolt-1 opacity-20" style={{ transform: 'translate(600px, 500px)', animation: 'drift-slow 25s ease-in-out infinite' }}>
          <polygon
            points="0,0 10,5 10,15 0,20 -10,15 -10,5"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            className="text-red/30"
          />
          <rect x="-2" y="20" width="4" height="20" stroke="currentColor" strokeWidth="1" fill="none" className="text-red/25" />
        </g>

        <g className="small-bolt-2 opacity-25" style={{ transform: 'translate(1600px, 600px)', animation: 'drift-gentle 18s ease-in-out infinite' }}>
          <polygon
            points="0,0 8,4 8,12 0,16 -8,12 -8,4"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            className="text-amber/30"
          />
          <rect x="-1.5" y="16" width="3" height="15" stroke="currentColor" strokeWidth="1" fill="none" className="text-amber/25" />
        </g>

        {/* Industrial grid pattern - very subtle */}
        <defs>
          <pattern id="industrialGrid" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-muted/10"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#industrialGrid)" className="opacity-20" />
      </svg>
    </div>
  );
});

AutoPartsBackdrop.displayName = 'AutoPartsBackdrop';

export default AutoPartsBackdrop;