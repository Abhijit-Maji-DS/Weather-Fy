import { motion } from "framer-motion";

export default function LoadingScreen({ message = "Synchronizing atmosphere…" }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-20 h-20 mx-auto">
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-cyber-300/40"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-2 rounded-full border-2 border-t-cyber-200 border-white/10"
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-5 rounded-full bg-gradient-to-br from-cyber-300 to-cyber-700"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            style={{ boxShadow: "0 0 30px rgba(96,165,250,0.6)" }}
          />
        </div>
        <div className="mt-6 text-sm text-white/70 tracking-wide">{message}</div>
      </div>
    </div>
  );
}
