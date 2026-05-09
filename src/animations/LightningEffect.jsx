import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function LightningEffect({ frequency = 6000 }) {
  const [flash, setFlash] = useState(false);
  useEffect(() => {
    let t;
    const loop = () => {
      const wait = frequency * (0.5 + Math.random());
      t = setTimeout(() => {
        setFlash(true);
        setTimeout(() => setFlash(false), 220 + Math.random() * 250);
        loop();
      }, wait);
    };
    loop();
    return () => clearTimeout(t);
  }, [frequency]);

  return (
    <AnimatePresence>
      {flash && (
        <motion.div
          key="flash"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.3, 0.9, 0] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              "radial-gradient(ellipse at 30% 10%, rgba(220,235,255,0.95), rgba(180,210,255,0.4) 30%, transparent 65%)",
            mixBlendMode: "screen",
          }}
        >
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path
              d="M30 0 L40 30 L25 35 L48 70 L35 70 L55 100"
              stroke="rgba(255,255,255,0.95)"
              strokeWidth="0.5"
              fill="none"
              style={{ filter: "drop-shadow(0 0 4px rgba(180,210,255,1))" }}
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
