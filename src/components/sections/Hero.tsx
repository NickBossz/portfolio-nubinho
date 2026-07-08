import { motion } from "framer-motion";
import { Timecode } from "../effects/Timecode";
import { MagneticButton } from "../effects/MagneticButton";

const lineVariants = {
  hidden: { y: "110%" },
  show: (i: number) => ({
    y: 0,
    transition: { delay: 0.1 + i * 0.08, duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  }),
};

const lines = ["TRANSFORMANDO", "IDEIAS EM", "MOVIMENTO."];

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden pt-24 md:pt-28">
      {/* corner marks */}
      <div className="pointer-events-none absolute inset-6 z-10 md:inset-10">
        <span className="absolute left-0 top-0 h-4 w-4 border-l border-t border-white/40" />
        <span className="absolute right-0 top-0 h-4 w-4 border-r border-t border-white/40" />
        <span className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-white/40" />
        <span className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-white/40" />
      </div>

      <div className="mx-auto flex max-w-[1600px] flex-col gap-10 px-6 md:px-10">
        {/* metadata bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-mono text-white/50">
          <div className="flex items-center gap-4">
            <span className="rec-dot inline-flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-red-500" /> REC
            </span>
            <span><Timecode /></span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <span>4K · 24FPS</span>
            <span>SCENE 01 / TAKE 06</span>
            <span>SHOWREEL 2026</span>
          </div>
        </div>

        {/* headline */}
        <div className="relative">
          <h1 className="text-display text-[16vw] leading-[0.85] md:text-[11vw]">
            {lines.map((l, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  className="block"
                  variants={lineVariants}
                  initial="hidden"
                  animate="show"
                  custom={i}
                >
                  {l.split("").map((c, j) =>
                    c === " " ? (
                      <span key={j}>&nbsp;</span>
                    ) : (
                      <span key={j} className="inline-block">{c}</span>
                    )
                  )}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="absolute -right-2 top-2 hidden text-mono text-white/40 md:block"
          >
            [ 01 / 03 ]
          </motion.span>
        </div>

        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-end">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="max-w-xl text-lg text-white/70 md:text-xl"
          >
            Edição de vídeo, storytelling e motion design para marcas,
            criadores e projetos que <span className="italic text-white">querem ser lembrados</span>.
          </motion.p>

          {/* video frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-video overflow-hidden border border-white/20 bg-surface"
                 style={{ clipPath: "polygon(0 0, 100% 0, 100% 88%, 92% 100%, 0 100%)" }}
                 data-cursor="PLAY">
              <img
                src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200&q=80"
                alt="Frame de showreel"
                className="h-full w-full object-cover grayscale contrast-125"
              />
              <div className="scanlines pointer-events-none absolute inset-0" />
              <div className="pointer-events-none absolute inset-0 vignette" />
              <div className="absolute left-3 top-3 flex items-center gap-2 text-mono text-white/90">
                <span className="rec-dot inline-block h-2 w-2 rounded-full bg-red-500" />
                REC
              </div>
              <div className="absolute right-3 top-3 text-mono text-white/90">4K / 24 FPS</div>
              <div className="absolute bottom-3 left-3 text-mono text-white/90"><Timecode /></div>
              <div className="absolute bottom-3 right-3 text-mono text-white/90">SHOWREEL_01</div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-wrap items-center gap-4 pb-16"
        >
          <MagneticButton
            as="a"
            href="#projects"
            className="text-mono border border-white bg-white px-6 py-4 text-black transition hover:bg-transparent hover:text-white"
          >
            VER PROJETOS →
          </MagneticButton>
          <MagneticButton
            as="a"
            href="#contact"
            className="text-mono border border-white/30 px-6 py-4 transition hover:border-white"
          >
            SOLICITAR ORÇAMENTO
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
