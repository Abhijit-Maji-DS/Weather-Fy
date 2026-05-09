import { motion } from "framer-motion";
import { useRef, useState } from "react";

export default function GlassCard({
  children,
  className = "",
  delay = 0,
  tilt = true,
  hover = true,
  ...props
}) {
  const ref = useRef(null);
  const [trf, setTrf] = useState({ rx: 0, ry: 0, gx: "50%", gy: "50%" });

  const onMouseMove = (e) => {
    if (!tilt || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setTrf({
      ry: (px - 0.5) * 8,
      rx: -(py - 0.5) * 8,
      gx: `${px * 100}%`,
      gy: `${py * 100}%`,
    });
  };
  const onLeave = () => setTrf({ rx: 0, ry: 0, gx: "50%", gy: "50%" });

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.9, 0.3, 1] }}
      whileHover={hover ? { y: -4 } : undefined}
      style={{
        transform: tilt
          ? `perspective(1000px) rotateX(${trf.rx}deg) rotateY(${trf.ry}deg)`
          : undefined,
        transformStyle: "preserve-3d",
      }}
      className={`relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.06] backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.37)] transition-all duration-300 ${className}`}
      {...props}
    >
      {/* Mouse-follow glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at ${trf.gx} ${trf.gy}, rgba(147,197,253,0.15), transparent 40%)`,
        }}
      />
      {/* Inner highlight */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[32px]"
        style={{
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(0,0,0,0.25)",
        }}
      />
      {/* Shimmer */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div
          className="absolute -inset-y-2 -inset-x-1/2 animate-shimmer"
          style={{
            background:
              "linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.06) 50%, transparent 65%)",
            backgroundSize: "200% 100%",
          }}
        />
      </div>
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
