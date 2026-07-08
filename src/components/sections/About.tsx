import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="relative border-t border-white/10 py-24 md:py-32">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-6 md:grid-cols-[1fr_1.2fr] md:gap-20 md:px-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative"
        >
          <div className="relative aspect-[3/4] overflow-hidden border border-white/15">
            <img
              src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&q=80"
              alt="Editor"
              className="h-full w-full object-cover grayscale contrast-125"
            />
            <div className="scanlines absolute inset-0 opacity-30" />
            <div className="absolute inset-0 vignette" />
            <div className="absolute left-3 top-3 text-mono text-white/80">SUBJECT / 001</div>
            <div className="absolute right-3 bottom-3 text-mono text-white/80">B&W · 35MM</div>
          </div>
          <div className="pointer-events-none absolute -bottom-4 -right-4 hidden aspect-video w-48 overflow-hidden border border-white/20 md:block">
            <img
              src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&q=80"
              alt=""
              className="h-full w-full object-cover"
            />
            <div className="scanlines absolute inset-0" />
          </div>
        </motion.div>

        <div>
          <div className="text-mono text-white/50">/ 05 — SOBRE</div>
          <h2 className="text-display mt-2 text-5xl md:text-7xl">
            Por trás <br />da <span className="italic font-serif normal-case tracking-normal">edição</span>.
          </h2>
          <p className="mt-8 max-w-xl text-lg text-white/70 leading-relaxed">
            Sou editor de vídeos focado em transformar ideias, gravações e referências
            em histórias visuais envolventes. Cada projeto é construído considerando
            ritmo, intenção, identidade e a experiência de quem está assistindo.
          </p>
          <p className="mt-4 max-w-xl text-white/60">
            Trabalho com marcas, criadores e produtoras — do reel vertical de 15 segundos
            ao documentário long-form. O objetivo é sempre o mesmo: entregar algo que
            mereça a atenção que pede.
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-8 text-mono">
            {[
              ["BASEADO EM", "Uberlândia — MG"],
              ["DISPONÍVEL PARA", "Projetos remotos"],
              ["EXPERIÊNCIA", "3+ anos"],
              ["FOCO", "Edição + Motion"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-white/40">{k}</dt>
                <dd className="mt-1 text-white text-sm">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
