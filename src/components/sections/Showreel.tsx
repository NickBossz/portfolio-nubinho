import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { useState } from "react";

export function Showreel() {
  const [open, setOpen] = useState(false);
  return (
    <section id="showreel" className="border-t border-white/10 py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <div className="text-mono text-white/50">/ 01 — SHOWREEL</div>
            <h2 className="text-display mt-2 text-6xl md:text-8xl">Showreel<span className="text-white/30"> 2026</span></h2>
          </div>
          <div className="hidden text-right text-mono text-white/50 md:block">
            <div>DURATION 01:58</div>
            <div>SOUND ON ⬢</div>
          </div>
        </div>

        <button
          onClick={() => setOpen(true)}
          data-cursor="PLAY"
          className="group relative block aspect-video w-full overflow-hidden border border-white/15 bg-surface"
        >
          <img
            src="https://images.unsplash.com/photo-1518676590629-3dcba9c5a5d1?w=2000&q=80"
            alt="Showreel"
            className="h-full w-full object-cover grayscale transition duration-1000 group-hover:scale-105 group-hover:grayscale-0"
          />
          <div className="scanlines pointer-events-none absolute inset-0 opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />
          <div className="absolute left-6 top-6 flex items-center gap-2 text-mono text-white/90">
            <span className="rec-dot inline-block h-2 w-2 rounded-full bg-red-500" /> REC · SHOWREEL_MASTER
          </div>
          <div className="absolute right-6 top-6 text-mono text-white/90">01:58 / MOTION · EDIT · COLOR · 2026</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-24 w-24 items-center justify-center rounded-full border border-white/70 bg-black/30 backdrop-blur-sm transition group-hover:scale-110 group-hover:bg-white group-hover:text-black">
              <Play className="ml-1" size={28} />
            </span>
          </div>
          <div className="absolute bottom-6 left-6 text-mono text-white/70">TAP TO PLAY · SOUND ON</div>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/95 p-4 md:p-10"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 flex items-center gap-2 text-mono text-white/70 hover:text-white md:right-8 md:top-8"
              aria-label="Fechar"
            >
              FECHAR <X size={18} />
            </button>
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="aspect-video w-full max-w-6xl border border-white/20"
            >
              <iframe
                src="https://player.vimeo.com/video/76979871?autoplay=1"
                title="Showreel"
                allow="autoplay; fullscreen"
                className="h-full w-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
