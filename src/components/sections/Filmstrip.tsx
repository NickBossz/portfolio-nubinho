import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { projects } from "../../content/projects";

const frames = projects.map((project) => project.thumbnail);

export function Filmstrip() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-35%", "0%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-background-secondary py-16 md:py-24">
      <div className="mx-auto mb-10 max-w-7xl px-5 md:px-8">
        <div className="text-mono text-white/50">Portfólio em movimento</div>
        <h2 className="text-display mt-2 text-4xl md:text-6xl">
          Edições na <span className="italic font-serif normal-case tracking-normal">timeline</span>
        </h2>
      </div>

      <div className="relative -rotate-2">
        <FilmRow x={x1} />
        <div className="h-3" />
        <FilmRow x={x2} reverse />
      </div>
    </section>
  );
}

function FilmRow({ x, reverse = false }: { x: MotionValue<string>; reverse?: boolean }) {
  const list = reverse ? [...frames].reverse() : frames;
  return (
    <motion.div style={{ x }} className="flex gap-3 px-2">
      {[...list, ...list, ...list, ...list].map((src, i) => (
        <div key={`${src}-${i}`} className="relative aspect-video w-56 shrink-0 overflow-hidden border border-white/10 bg-surface md:w-72">
          <img src={src} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      ))}
    </motion.div>
  );
}
