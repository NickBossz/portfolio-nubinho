import servicesContent from "../../content/services.json";

const services = servicesContent.services;

export function Services() {
  return (
    <section id="services" className="relative border-t border-white/10 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <div className="text-mono text-white/50">Serviços</div>
            <h2 className="text-display mt-2 text-4xl md:text-6xl">
              O que posso <span className="italic font-serif normal-case tracking-normal">editar</span>
            </h2>
          </div>
          <a href="#contact" className="text-mono border border-white/30 px-4 py-3 transition hover:border-white hover:bg-white hover:text-black">
            Contratar editor
          </a>
        </div>

        <ul className="grid gap-3 md:grid-cols-2">
          {services.map((s) => (
            <li key={s.number} className="border border-white/10 bg-surface/60 p-5 transition hover:border-white/30">
              <div className="text-mono text-orange-500">{s.number}</div>
              <h3 className="text-display mt-3 text-3xl md:text-4xl">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">{s.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
