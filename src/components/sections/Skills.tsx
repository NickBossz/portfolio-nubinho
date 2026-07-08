import { motion } from "framer-motion";

const tools = [
  "Adobe Premiere Pro",
  "After Effects",
  "DaVinci Resolve",
  "Photoshop",
  "Audition",
  "CapCut",
  "Blender",
  "Cinema 4D",
];

const skills = [
  "Storytelling",
  "Cortes dinâmicos",
  "Sound design",
  "Color grading",
  "Motion graphics",
  "Legendas animadas",
  "Tratamento de áudio",
  "Edição vertical",
  "Long-form editing",
];

export function Skills() {
  return (
    <section className="relative border-t border-white/10 py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="mb-14">
          <div className="text-mono text-white/50">/ 06 — TOOLKIT</div>
          <h2 className="text-display mt-2 text-5xl md:text-7xl">
            Ferramentas <span className="italic font-serif normal-case tracking-normal">&amp;</span> habilidades.
          </h2>
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <div className="text-mono text-white/50 mb-6">SOFTWARE</div>
            <ul className="flex flex-wrap gap-3">
              {tools.map((t, i) => (
                <motion.li
                  key={t}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="text-mono border border-white/20 px-4 py-2 transition hover:border-white hover:bg-white hover:text-black"
                  data-cursor="•"
                >
                  {t}
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-mono text-white/50 mb-6">SKILLS</div>
            <ul className="space-y-2">
              {skills.map((s, i) => (
                <motion.li
                  key={s}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-4 border-b border-white/10 py-2 text-lg"
                >
                  <span className="text-mono text-white/40 w-10">{String(i + 1).padStart(2, "0")}</span>
                  <span>{s}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
