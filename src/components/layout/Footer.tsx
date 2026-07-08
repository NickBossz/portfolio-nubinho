import { Timecode } from "../effects/Timecode";

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-background">
      <div className="overflow-hidden border-b border-white/10 py-6">
        <div className="marquee-track text-display text-4xl md:text-6xl">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="flex items-center gap-8 text-white/90">
              AVAILABLE FOR SELECTED PROJECTS
              <span className="text-white/30">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-[1600px] gap-10 px-6 py-16 md:grid-cols-4 md:px-10">
        <div>
          <div className="text-mono text-white/50">EDITOR / FRAMES</div>
          <div className="mt-2 text-display text-3xl">Nome do Editor</div>
        </div>
        <div>
          <div className="text-mono text-white/50">CONTATO</div>
          <ul className="mt-2 space-y-1 text-sm">
            <li>ola@editor.com</li>
            <li>WhatsApp +55 34 90000-0000</li>
          </ul>
        </div>
        <div>
          <div className="text-mono text-white/50">REDES</div>
          <ul className="mt-2 space-y-1 text-sm">
            <li><a className="hover:text-white/60" href="#" data-cursor="↗">Instagram</a></li>
            <li><a className="hover:text-white/60" href="#" data-cursor="↗">Vimeo</a></li>
            <li><a className="hover:text-white/60" href="#" data-cursor="↗">Behance</a></li>
          </ul>
        </div>
        <div>
          <div className="text-mono text-white/50">LOCAL</div>
          <div className="mt-2 text-sm">Uberlândia — MG, Brasil</div>
          <div className="mt-4 text-mono text-white/40"><Timecode /></div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-4 border-t border-white/10 px-6 py-6 text-mono text-white/40 md:flex-row md:items-center md:px-10">
        <span>© 2026 NOME DO EDITOR</span>
        <a href="#top" data-cursor="TOP" className="hover:text-white">VOLTAR AO TOPO ↑</a>
      </div>
    </footer>
  );
}
