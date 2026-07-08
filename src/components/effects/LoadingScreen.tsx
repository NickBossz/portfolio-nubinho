import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [show, setShow] = useState(true);
  const [tc, setTc] = useState("00:00:00:00");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const total = 1400;
    const id = setInterval(() => {
      const e = Date.now() - start;
      const p = Math.min(1, e / total);
      setProgress(p);
      const ms = Math.floor(p * 4200);
      const s = String(Math.floor(ms / 1000)).padStart(2, "0");
      const f = String(Math.floor((ms % 1000) / (1000 / 24))).padStart(2, "0");
      setTc(`00:00:${s}:${f}`);
      if (p >= 1) {
        clearInterval(id);
        setTimeout(() => setShow(false), 500);
      }
    }, 33);
    return () => clearInterval(id);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[200] overflow-hidden bg-background"
        >
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-x-0 top-0 h-1/2 bg-black flex items-end justify-center pb-6"
          >
            <div className="text-mono text-white/70">LOADING FRAMES</div>
          </motion.div>
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-x-0 bottom-0 h-1/2 bg-black flex items-start justify-center pt-6"
          >
            <div className="text-mono text-white/70 tabular-nums">{tc}</div>
          </motion.div>
          <div className="absolute left-1/2 top-1/2 z-10 w-56 -translate-x-1/2 -translate-y-1/2">
            <div className="h-px w-full bg-white/20">
              <div
                className="h-px bg-white transition-[width]"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
