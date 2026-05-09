import CloudLayer from "./CloudLayer";
import FloatingParticles from "./FloatingParticles";

export default function CloudyBackground({ isNight = false }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: isNight
            ? "linear-gradient(180deg, #0b1226 0%, #1e293b 60%, #0f172a 100%)"
            : "linear-gradient(180deg, #475569 0%, #64748b 50%, #94a3b8 100%)",
        }}
      />
      <CloudLayer density={8} opacity={isNight ? 0.35 : 0.65} />
      <FloatingParticles
        count={30}
        color={isNight ? "rgba(147,197,253,0.4)" : "rgba(255,255,255,0.5)"}
        size={[1, 2]}
        speed={[0.02, 0.1]}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
    </div>
  );
}
