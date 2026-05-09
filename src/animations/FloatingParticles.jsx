import { useEffect, useRef } from "react";

/**
 * Lightweight canvas particle system.
 * Handles ambient floating motes used by multiple backgrounds.
 */
export default function FloatingParticles({
  count = 60,
  color = "rgba(147,197,253,0.6)",
  size = [1, 3],
  speed = [0.05, 0.25],
  blur = 0,
  className = "",
}) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let parts = [];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    const init = () => {
      parts = Array.from({ length: count }).map(() => ({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        r: size[0] + Math.random() * (size[1] - size[0]),
        vx: (Math.random() - 0.5) * speed[1],
        vy: -(speed[0] + Math.random() * (speed[1] - speed[0])),
        a: 0.3 + Math.random() * 0.7,
        tw: Math.random() * Math.PI * 2,
      }));
    };

    const tick = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      if (blur) ctx.filter = `blur(${blur}px)`;
      parts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.tw += 0.02;
        if (p.y < -10) p.y = canvas.offsetHeight + 10;
        if (p.x < -10) p.x = canvas.offsetWidth + 10;
        if (p.x > canvas.offsetWidth + 10) p.x = -10;
        const a = p.a * (0.6 + 0.4 * Math.sin(p.tw));
        ctx.beginPath();
        ctx.fillStyle = color.replace(/[\d.]+\)$/, `${a.toFixed(2)})`);
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(tick);
    };

    resize();
    init();
    tick();
    window.addEventListener("resize", () => {
      resize();
      init();
    });
    return () => cancelAnimationFrame(raf);
  }, [count, color, blur]);

  return (
    <canvas
      ref={ref}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
}
