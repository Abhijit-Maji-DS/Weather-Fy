import RainBackground from "./RainBackground";
import LightningEffect from "./LightningEffect";

export default function ThunderBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #050913 0%, #0b1426 50%, #050913 100%)",
        }}
      />
      <RainBackground heavy />
      <LightningEffect frequency={5500} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />
    </div>
  );
}
