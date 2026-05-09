import { useEffect, useState } from "react";
import { animate } from "framer-motion";

export default function AnimatedNumber({ value, decimals = 0, duration = 1.4, className = "" }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const controls = animate(display, Number(value) || 0, {
      duration,
      ease: [0.2, 0.9, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return <span className={className}>{display.toFixed(decimals)}</span>;
}
