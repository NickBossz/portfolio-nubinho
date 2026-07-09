import editor from "../../content/editor.json";
import socials from "../../content/socials.json";

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-background">
      <div className="overflow-hidden border-b border-white/10 py-4">
        <div className="marquee-track text-display text-3xl md:text-5xl">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="flex items-center gap-6 text-white/90">
              DISPONÍVEL PARA EDITAR GAMEPLAYS
              <span className="text-orange-500">/</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-4 md:px-8">
        <div>
          <div className="text-mono text-white/50">Editor</div>
          <div className="mt-2 text-display text-3xl">{editor.name}</div>
        </div>
        <div>
          <div className="text-mono text-white/50">Contato</div>
          <ul className="mt-2 space-y-1 text-sm text-white/70">
            <li>Instagram: {socials.instagramLabel}</li>
            <li>Discord: {socials.discord}</li>
            <li>WhatsApp: {socials.whatsapp}</li>
          </ul>
        </div>
        <div>
          <div className="text-mono text-white/50">Portfólio</div>
          <ul className="mt-2 space-y-1 text-sm">
            <li><a className="text-white/70 hover:text-white" href="#projects" data-cursor="go">Projetos</a></li>
            <li><a className="text-white/70 hover:text-white" href="#services" data-cursor="go">Serviços</a></li>
            <li><a className="text-white/70 hover:text-white" href="#contact" data-cursor="go">Contato</a></li>
          </ul>
        </div>
        <div>
          <div className="text-mono text-white/50">Foco</div>
          <div className="mt-2 text-sm text-white/70">{editor.focus}</div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 border-t border-white/10 px-5 py-5 text-mono text-white/40 md:flex-row md:items-center md:px-8">
        <span>2026 {editor.name}</span>
        <a href="#top" data-cursor="top" className="hover:text-white">Voltar ao topo</a>
      </div>
    </footer>
  );
}
