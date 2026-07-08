import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const steps = [
  { n: "01", title: "Entendimento", desc: "Briefing, referências, público e objetivo do projeto." },
  { n: "02", title: "Organização", desc: "Seleção de arquivos, roteiro e estrutura narrativa." },
  { n: "03", title: "Edição", desc: "Cortes, ritmo, trilha, efeitos e storytelling." },
  { n: "04", title: "Refinamento", desc: "Motion design, color grading, áudio e detalhes finais." },
  { n: "05", title: "Entrega", desc: "Exportação nos formatos necessários e ajustes finais." },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 30%"] });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative border-t border-white/10 py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="mb-16">
          <div className="text-mono text-white/50">/ 04 — PROCESSO</div>
          <h2 className="text-display mt-2 text-5xl md:text-7xl">
            Do briefing <br />ao <span className="italic font-serif normal-case tracking-normal">frame final</span>.
          </h2>
        </div>

        <div ref={ref} className="relative grid gap-12 md:pl-24">
          <div className="absolute left-4 top-0 hidden h-full w-px bg-white/10 md:block">
            <motion.div style={{ height }} className="absolute inset-x-0 top-0 w-px bg-white origin-top" />
          </div>

          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="relative grid gap-4 md:grid-cols-[auto_1fr] md:gap-16"
            >
              <div className="absolute -left-24 top-3 hidden h-3 w-3 rounded-full border-2 border-white bg-background md:block" />
              <div className="text-display text-6xl text-white/30 md:text-8xl">{s.n}</div>
              <div>
                <h3 className="text-display text-3xl md:text-5xl">{s.title}</h3>
                <p className="mt-2 max-w-xl text-white/60">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
