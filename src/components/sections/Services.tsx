import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import services from "../../data/services.json";

const previews = [
  "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80",
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
  "https://images.unsplash.com/photo-1526401485004-46910ecc8e51?w=800&q=80",
  "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80",
  "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80",
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
  "https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?w=800&q=80",
];

export function Services() {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <section id="services" className="relative border-t border-white/10 py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="text-mono text-white/50">/ 03 — SERVIÇOS</div>
            <h2 className="text-display mt-2 text-5xl md:text-7xl">
              Do corte final <br />à <span className="italic font-serif normal-case tracking-normal">narrativa completa</span>.
            </h2>
          </div>
        </div>

        <div className="relative">
          <ul className="border-t border-white/10">
            {services.map((s, i) => (
              <li
                key={s.number}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                data-cursor="VIEW"
                className={`group relative grid grid-cols-[80px_1fr_auto] items-center gap-6 border-b border-white/10 px-2 py-8 transition-all duration-500 md:grid-cols-[120px_1fr_1fr_auto] md:py-10 ${
                  hover !== null && hover !== i ? "opacity-30" : "opacity-100"
                }`}
              >
                <span className="text-mono text-white/40">{s.number}</span>
                <h3 className="text-display text-3xl md:text-5xl transition-transform group-hover:translate-x-2">
                  {s.title}
                </h3>
                <p className="hidden text-sm text-white/60 md:block">{s.description}</p>
                <span className="text-mono text-white/40 transition group-hover:text-white">→</span>
              </li>
            ))}
          </ul>

          <AnimatePresence>
            {hover !== null && (
              <motion.div
                key={hover}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="pointer-events-none fixed right-10 top-1/2 z-40 hidden aspect-video w-96 -translate-y-1/2 overflow-hidden border border-white/20 shadow-2xl xl:block"
              >
                <img src={previews[hover]} alt="" className="h-full w-full object-cover grayscale" />
                <div className="scanlines absolute inset-0 opacity-40" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
