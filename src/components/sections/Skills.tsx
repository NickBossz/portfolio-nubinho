import { motion } from "framer-motion";

const tools = [
  { short: "Ae", name: "After Effects", color: "border-[#9b8cff] text-[#c9c2ff] bg-[#171233]" },
  { short: "Pr", name: "Premiere Pro", color: "border-[#8a7cff] text-[#c7c0ff] bg-[#151235]" },
  { short: "Ps", name: "Photoshop", color: "border-[#55b7ff] text-[#b9e4ff] bg-[#061a2f]" },
];

const skills = [
  "Retenção",
  "Cortes dinâmicos",
  "Legendas",
  "Motion leve",
  "Thumbnail maker",
  "Vídeos verticais",
  "Vídeos longos",
  "Ritmo de gameplay",
];

export function Skills() {
  return (
    <section className="relative border-t border-white/10 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-10">
          <div className="text-mono text-white/50">Toolkit</div>
          <h2 className="text-display mt-2 text-4xl md:text-6xl">
            Ferramentas <span className="italic font-serif normal-case tracking-normal">e foco</span>
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-wrap gap-3">
            {tools.map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`flex h-24 w-24 flex-col justify-between border p-3 ${tool.color}`}
              >
                <span className="text-display text-4xl leading-none normal-case">{tool.short}</span>
                <span className="text-mono text-[10px] normal-case tracking-normal">{tool.name}</span>
              </motion.div>
            ))}
          </div>

          <ul className="grid gap-2 sm:grid-cols-2">
            {skills.map((skill, i) => (
              <motion.li
                key={skill}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="border border-white/10 px-4 py-3 text-sm text-white/75"
              >
                {skill}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
