import { motion } from "framer-motion";
import editor from "../../content/editor.json";

export function About() {
  return (
    <section id="about" className="relative border-t border-white/10 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="text-mono text-orange-500">{editor.aboutEyebrow}</div>
        <h2 className="text-display mt-3 text-4xl md:text-6xl">{editor.aboutTitle}</h2>
        <div className="mt-4 h-0.5 w-12 bg-orange-500" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-8 border-l-2 border-orange-500 bg-surface/70 p-6 md:p-8"
        >
          <div className="space-y-5 text-sm leading-relaxed text-white/75 md:text-base">
            {editor.aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <dl className="mt-8 grid gap-3 text-center md:grid-cols-3">
            {editor.stats.map(({ value, label }) => (
              <div key={label} className="border border-white/10 px-4 py-5">
                <dt className="text-display text-4xl text-orange-500">{value}</dt>
                <dd className="mt-1 text-mono text-white/35">{label}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
