import GlassCard from "./GlassCard";
import { FiSunrise, FiSunset } from "react-icons/fi";

export default function SunArc({ current }) {
  if (!current?.sunrise || !current?.sunset) return null;
  const now = new Date(current.time).getTime();
  const sr = new Date(current.sunrise).getTime();
  const ss = new Date(current.sunset).getTime();
  const t = Math.max(0, Math.min(1, (now - sr) / Math.max(1, ss - sr)));

  // Arc points
  const W = 320, H = 130, P = 14;
  const x = P + t * (W - 2 * P);
  // Parabolic arc y
  const arcY = (xx) => {
    const nx = (xx - P) / (W - 2 * P);
    return H - 4 * (H - 14) * nx * (1 - nx) - 8;
  };
  const y = arcY(x);

  const fmt = (iso) =>
    new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <GlassCard className="p-6 md:p-7" delay={0.3}>
      <h3 className="text-sm uppercase tracking-[0.25em] text-white/60 font-medium mb-4">
        Sun Path
      </h3>
      <div className="relative">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
          <defs>
            <linearGradient id="sunpath" x1="0" x2="1">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="50%" stopColor="#fde68a" />
              <stop offset="100%" stopColor="#f472b6" />
            </linearGradient>
          </defs>
          <path
            d={`M ${P} ${H - 8} Q ${W / 2} -40 ${W - P} ${H - 8}`}
            stroke="url(#sunpath)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="4 4"
            opacity="0.7"
          />
          <line x1={P} x2={W - P} y1={H - 8} y2={H - 8} stroke="rgba(255,255,255,0.2)" strokeDasharray="2 4" />
          {t > 0 && t < 1 && (
            <g>
              <circle cx={x} cy={y} r="14" fill="#fde68a" opacity="0.25">
                <animate attributeName="r" values="14;20;14" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx={x} cy={y} r="7" fill="#fef3c7" style={{ filter: "drop-shadow(0 0 12px #fde68a)" }} />
            </g>
          )}
          {(t <= 0 || t >= 1) && (
            <circle cx={x} cy={y} r="6" fill="#cbd5e1" opacity="0.7" />
          )}
        </svg>
        <div className="flex justify-between mt-3 text-sm">
          <div className="flex items-center gap-2 text-white/85">
            <FiSunrise className="text-amber-300" />
            <div>
              <div className="text-[10px] uppercase tracking-widest text-white/45">Sunrise</div>
              <div className="font-medium">{fmt(current.sunrise)}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-white/85">
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-widest text-white/45">Sunset</div>
              <div className="font-medium">{fmt(current.sunset)}</div>
            </div>
            <FiSunset className="text-rose-300" />
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
