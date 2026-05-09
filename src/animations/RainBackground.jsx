import { useEffect, useRef } from "react";
import CloudLayer from "./CloudLayer";

export default function RainBackground({ heavy = false }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let drops = [];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    const init = () => {
      const count = heavy ? 380 : 200;
      drops = Array.from({ length: count }).map(() => ({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        l: 12 + Math.random() * 28,
        v: 8 + Math.random() * 14,
        o: 0.2 + Math.random() * 0.6,
        layer: Math.random() < 0.4 ? 0 : 1,
      }));
    };

    const tick = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      drops.forEach((d) => {
        ctx.strokeStyle = `rgba(173,216,230,${d.o * (d.layer ? 1 : 0.5)})`;
        ctx.lineWidth = d.layer ? 1.1 : 0.6;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - 1.5, d.y + d.l);
        ctx.stroke();
        d.y += d.v;
        d.x -= 1.2;
        if (d.y > canvas.offsetHeight) {
          d.y = -20;
          d.x = Math.random() * canvas.offsetWidth;
        }
      });
      raf = requestAnimationFrame(tick);
    };

    resize();
    init();
    tick();
    const onR = () => {
      resize();
      init();
    };
    window.addEventListener("resize", onR);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onR);
    };
  }, [heavy]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #0b1626 0%, #11233f 40%, #0a1830 100%)",
        }}
      />
      <CloudLayer density={6} opacity={0.5} />
      <canvas ref={ref} className="absolute inset-0 w-full h-full" />
      {/* Wet glass overlay */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.08) 0 2px, transparent 3px), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.06) 0 1.5px, transparent 3px), radial-gradient(circle at 40% 80%, rgba(255,255,255,0.07) 0 2px, transparent 3px)",
          backgroundSize: "180px 180px, 140px 140px, 220px 220px",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
    </div>
  );
}
