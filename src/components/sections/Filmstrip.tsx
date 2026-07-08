import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const frames = [
  "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80",
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80",
  "https://images.unsplash.com/photo-1526401485004-46910ecc8e51?w=800&q=80",
  "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
  "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80",
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
  "https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?w=800&q=80",
  "https://images.unsplash.com/photo-1518676590629-3dcba9c5a5d1?w=800&q=80",
];

export function Filmstrip() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-40%", "0%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-6, 6]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-background-secondary py-24 md:py-40">
      <div className="mx-auto mb-16 max-w-[1600px] px-6 md:px-10">
        <div className="text-mono text-white/50">/ FILM STRIP · SCENE 03</div>
        <h2 className="text-display mt-2 text-6xl md:text-8xl">
          Frame by <span className="italic font-serif normal-case tracking-normal">frame</span>.
        </h2>
        <p className="mt-4 max-w-xl text-white/60">
          Cada projeto é uma sequência de decisões. Ritmo, respiração, corte. Uma película
          costurada com precisão.
        </p>
      </div>

      <motion.div style={{ rotate }} className="relative">
        <FilmRow x={x1} />
        <div className="h-6" />
        <FilmRow x={x2} reverse />
      </motion.div>
    </section>
  );
}

function FilmRow({ x, reverse = false }: { x: import("framer-motion").MotionValue<string>; reverse?: boolean }) {
  const list = reverse ? [...frames].reverse() : frames;
  return (
    <div className="relative">
      {/* film sprocket holes top */}
      <div className="flex h-6 items-center gap-3 bg-black px-4">
        {Array.from({ length: 60 }).map((_, i) => (
          <span key={i} className="h-3 w-6 rounded-sm bg-neutral-800" />
        ))}
      </div>
      <motion.div style={{ x }} className="flex gap-2 bg-black px-2 py-3">
        {[...list, ...list, ...list].map((src, i) => (
          <div key={i} className="relative aspect-[4/3] w-64 shrink-0 overflow-hidden border border-white/10">
            <img src={src} alt="" className="h-full w-full object-cover grayscale contrast-125" />
            <div className="scanlines absolute inset-0 opacity-30" />
            <div className="absolute left-2 top-2 text-mono text-[9px] text-white/70">
              FR.{String(i + 100).padStart(4, "0")}
            </div>
            <div className="absolute right-2 bottom-2 text-mono text-[9px] text-white/70">
              24FPS
            </div>
          </div>
        ))}
      </motion.div>
      <div className="flex h-6 items-center gap-3 bg-black px-4">
        {Array.from({ length: 60 }).map((_, i) => (
          <span key={i} className="h-3 w-6 rounded-sm bg-neutral-800" />
        ))}
      </div>
    </div>
  );
}
