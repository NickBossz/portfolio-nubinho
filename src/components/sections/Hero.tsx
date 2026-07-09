import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { MagneticButton } from "../effects/MagneticButton";
import editor from "../../content/editor.json";

const lineVariants = {
  hidden: { y: "110%" },
  show: (i: number) => ({
    y: 0,
    transition: { delay: 0.1 + i * 0.08, duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden pt-20">
      <div className="absolute inset-0">
        <img
          src={editor.heroImage}
          alt="Setup gamer com telas e iluminação"
          className="h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/70 to-background" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl flex-col justify-center gap-10 px-5 pb-12 md:px-8">
        <div className="max-w-4xl">
          <div className="text-mono text-orange-500">{editor.headline}</div>
          <h1 className="text-display mt-4 text-7xl leading-[0.82] sm:text-8xl md:text-9xl lg:text-[10rem]">
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                variants={lineVariants}
                initial="hidden"
                animate="show"
                custom={0}
              >
                {editor.name}
              </motion.span>
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 md:text-xl"
          >
            {editor.heroSubtitle}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-wrap items-center gap-4"
        >
          <MagneticButton
            as="a"
            href="#contact"
            className="text-mono border border-white bg-white px-6 py-4 text-black transition hover:bg-transparent hover:text-white"
          >
            CONTRATAR EDITOR <ArrowRight className="inline" size={15} />
          </MagneticButton>
          <MagneticButton
            as="a"
            href="#projects"
            className="text-mono border border-white/30 px-6 py-4 transition hover:border-white"
          >
            VER PORTFÓLIO
          </MagneticButton>
        </motion.div>

        <a href="#about" className="absolute bottom-6 left-5 flex items-center gap-2 text-mono text-white/45 transition hover:text-white md:left-8">
          Sobre mim <ArrowDown size={14} />
        </a>
      </div>
    </section>
  );
}
