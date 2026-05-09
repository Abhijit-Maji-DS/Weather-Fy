import { useEffect, useRef } from "react";
import CloudLayer from "./CloudLayer";

export default function SnowBackground() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let flakes = [];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    const init = () => {
      flakes = Array.from({ length: 180 }).map(() => ({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        r: 1 + Math.random() * 3.2,
        v: 0.4 + Math.random() * 1.2,
        d: Math.random() * Math.PI * 2,
        o: 0.4 + Math.random() * 0.6,
      }));
    };

    const tick = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      flakes.forEach((f) => {
        f.d += 0.01;
        f.y += f.v;
        f.x += Math.sin(f.d) * 0.6;
        if (f.y > canvas.offsetHeight) {
          f.y = -10;
          f.x = Math.random() * canvas.offsetWidth;
        }
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${f.o})`;
        ctx.shadowColor = "rgba(200,225,255,0.7)";
        ctx.shadowBlur = 6;
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.shadowBlur = 0;
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
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #1e2a44 0%, #3b5b86 50%, #c7d8ec 100%)",
        }}
      />
      <CloudLayer density={5} opacity={0.5} />
      <canvas ref={ref} className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 100%, rgba(255,255,255,0.25), transparent 60%)",
        }}
      />
    </div>
  );
}
