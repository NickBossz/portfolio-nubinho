import { motion } from "framer-motion";
import testimonials from "../../data/testimonials.json";
import { Quote } from "lucide-react";

export function Testimonials() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="mb-14">
          <div className="text-mono text-white/50">/ 07 — DEPOIMENTOS</div>
          <h2 className="text-display mt-2 text-5xl md:text-7xl">
            O que dizem <br /><span className="italic font-serif normal-case tracking-normal">os clientes</span>.
          </h2>
        </div>
      </div>

      <motion.div
        drag="x"
        dragConstraints={{ left: -1400, right: 0 }}
        dragElastic={0.1}
        data-cursor="DRAG"
        className="flex cursor-grab gap-6 px-6 pb-4 md:px-10 active:cursor-grabbing"
      >
        {testimonials.map((t, i) => (
          <motion.div
            key={t.id}
            style={{ rotate: i % 2 === 0 ? -1 : 1 }}
            className="relative w-[85vw] max-w-md shrink-0 border border-white/15 bg-surface p-8 md:w-[440px]"
          >
            <Quote className="absolute right-6 top-6 text-white/10" size={72} />
            <p className="relative text-lg leading-relaxed text-white/90">"{t.text}"</p>
            <div className="mt-8 border-t border-white/10 pt-4">
              <div className="text-white">{t.name}</div>
              <div className="text-mono text-white/50">{t.role} · {t.company}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
