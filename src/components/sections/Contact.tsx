import { MagneticButton } from "../effects/MagneticButton";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-white/10 py-32 md:py-44">
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <img
          src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=2000&q=80"
          alt=""
          className="h-full w-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="scanlines absolute inset-0" />
      </div>

      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="text-mono text-white/50">/ 08 — CONTATO</div>
        <h2 className="text-display mt-4 text-6xl leading-[0.9] md:text-[10vw]">
          Tem uma ideia <br /><span className="italic font-serif normal-case tracking-normal">em movimento?</span>
        </h2>
        <p className="mt-8 max-w-xl text-lg text-white/70">
          Vamos transformar seu material em algo que as pessoas realmente queiram assistir.
          Envie referências, prazos e objetivos — respondo em até 24h.
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <MagneticButton
            as="a"
            href="mailto:ola@editor.com"
            className="text-mono border border-white bg-white px-8 py-5 text-black transition hover:bg-transparent hover:text-white"
          >
            COMEÇAR UM PROJETO →
          </MagneticButton>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
          {[
            ["EMAIL", "ola@editor.com", "mailto:ola@editor.com"],
            ["WHATSAPP", "+55 34 90000-0000", "#"],
            ["INSTAGRAM", "@editor.frames", "#"],
            ["VIMEO", "vimeo.com/editor", "#"],
          ].map(([label, val, href]) => (
            <a key={label} href={href} className="group border-t border-white/20 pt-4" data-cursor="↗">
              <div className="text-mono text-white/40">{label}</div>
              <div className="mt-2 text-lg transition group-hover:translate-x-1">{val}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
