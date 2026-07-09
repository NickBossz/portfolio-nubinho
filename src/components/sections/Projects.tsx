import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { ArrowRight, ExternalLink, X } from "lucide-react";
import { projects } from "../../content/projects";
import type { Project } from "../../types/project";

const CATEGORIES = ["Todos", "Motion design", "Vídeos longos", "Vídeos curtos"];

export function Projects() {
  const all = projects;
  const [filter, setFilter] = useState("Todos");
  const [active, setActive] = useState<Project | null>(null);

  const featured = all.find((p) => p.featured) ?? all[0];
  const filtered = useMemo(
    () => (filter === "Todos" ? all : all.filter((p) => p.category === filter)),
    [filter, all]
  );

  const activeIdx = active ? filtered.findIndex((p) => p.id === active.id) : -1;
  const nav = (dir: 1 | -1) => {
    if (activeIdx < 0) return;
    const next = filtered[(activeIdx + dir + filtered.length) % filtered.length];
    setActive(next);
  };

  return (
    <section id="projects" className="relative border-t border-white/10 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
          <div>
            <div className="text-mono text-white/50">Portfólio</div>
            <h2 className="text-display mt-2 text-4xl md:text-6xl">
              Projetos <span className="italic font-serif normal-case tracking-normal">selecionados</span>
            </h2>
          </div>
          <div className="text-mono text-white/50">{filtered.length.toString().padStart(2, "0")} projetos</div>
        </div>

        {featured && (
          <button
            onClick={() => setActive(featured)}
            data-cursor="open"
            className="group mb-8 grid w-full overflow-hidden border border-orange-500/40 bg-surface text-left md:grid-cols-[1.15fr_0.85fr]"
          >
            <div className="relative aspect-video overflow-hidden md:aspect-auto">
              <ProjectMedia
                project={featured}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            </div>
            <div className="flex flex-col justify-center p-5 md:p-8">
              <div className="text-mono text-orange-500">Edição em destaque</div>
              <h3 className="text-display mt-3 text-4xl md:text-5xl">{featured.title}</h3>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/65 md:text-base">
                {featured.shortDescription}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-mono text-white/80">
                Ver projeto <ArrowRight size={14} />
              </span>
            </div>
          </button>
        )}

        <div className="mb-8 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => {
            const isActive = c === filter;
            return (
              <button
                key={c}
                onClick={() => setFilter(c)}
                data-cursor="click"
                className={`text-mono border px-4 py-2 transition ${
                  isActive
                    ? "border-white bg-white text-black"
                    : "border-white/20 text-white/70 hover:border-white/60 hover:text-white"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>

        <motion.div layout className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.button
                key={p.id}
                layout
                layoutId={`card-${p.id}`}
                onClick={() => setActive(p)}
                data-cursor="open"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, delay: i * 0.03 }}
                className="group overflow-hidden border border-white/10 bg-surface text-left"
              >
                <motion.div
                  layoutId={`img-${p.id}`}
                  className={`relative w-full overflow-hidden ${p.orientation === "portrait" ? "aspect-[4/5]" : "aspect-video"}`}
                >
                  <ProjectMedia
                    project={p}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent" />
                  <div className="absolute left-4 top-4 text-mono text-white/70">{p.category}</div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <motion.h3 layoutId={`title-${p.id}`} className="text-display text-3xl md:text-4xl">
                      {p.title}
                    </motion.h3>
                    <div className="mt-2 flex items-center justify-between gap-4 text-mono text-white/60">
                      <span>{p.duration}</span>
                      <span className="inline-flex items-center gap-1 opacity-0 transition group-hover:opacity-100">
                        Abrir <ArrowRight size={13} />
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[95] overflow-y-auto bg-black/95 backdrop-blur-md"
          >
            <div className="min-h-screen">
              <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-white/10 bg-black/75 px-5 py-4 backdrop-blur md:px-8">
                <span className="text-mono text-white/60">
                  {active.category} / {active.year} / {active.duration}
                </span>
                <div className="flex items-center gap-3">
                  <button onClick={() => nav(-1)} className="hidden text-mono text-white/60 hover:text-white md:inline">Anterior</button>
                  <button onClick={() => nav(1)} className="hidden text-mono text-white/60 hover:text-white md:inline">Próximo</button>
                  <button
                    onClick={() => setActive(null)}
                    className="flex items-center gap-2 text-mono border border-white/30 px-3 py-1.5 hover:border-white"
                    aria-label="Fechar"
                  >
                    Fechar <X size={16} />
                  </button>
                </div>
              </div>

              <motion.div layoutId={`card-${active.id}`} className="mx-auto max-w-6xl px-5 py-8 md:px-8">
                <motion.div layoutId={`img-${active.id}`} className="relative aspect-video overflow-hidden border border-white/15">
                  <ProjectMedia project={active} className="h-full w-full object-cover" controls />
                </motion.div>

                <motion.h3
                  layoutId={`title-${active.id}`}
                  className="text-display mt-6 text-4xl md:text-6xl"
                >
                  {active.title}
                </motion.h3>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-8 grid gap-8 md:grid-cols-[2fr_1fr]"
                >
                  <div className="space-y-6">
                    <p className="text-base leading-relaxed text-white/80 md:text-lg">{active.fullDescription}</p>

                    <div>
                      <div className="text-mono text-white/50">Desafio</div>
                      <p className="mt-2 text-white/75">{active.challenge}</p>
                    </div>
                    <div>
                      <div className="text-mono text-white/50">Solução</div>
                      <p className="mt-2 text-white/75">{active.solution}</p>
                    </div>
                    <div>
                      <div className="text-mono text-white/50">Resultados</div>
                      <ul className="mt-2 space-y-1 text-white/75">
                        {active.results.map((r) => (
                          <li key={r} className="flex gap-2"><span className="text-white/40">-</span>{r}</li>
                        ))}
                      </ul>
                    </div>

                    {active.gallery.length > 0 && (
                      <div>
                        <div className="text-mono text-white/50">Galeria</div>
                        <div className="mt-3 grid gap-3 sm:grid-cols-2">
                          {active.gallery.map((image) => (
                            <img
                              key={image}
                              src={image}
                              alt=""
                              className="aspect-video w-full border border-white/10 object-cover"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <aside className="space-y-5 border-l border-white/10 pl-5 text-sm">
                    <div>
                      <div className="text-mono text-white/50">Cliente</div>
                      <div className="mt-1">{active.client}</div>
                    </div>
                    <div>
                      <div className="text-mono text-white/50">Função</div>
                      <ul className="mt-1 space-y-0.5">{active.role.map((r) => <li key={r}>{r}</li>)}</ul>
                    </div>
                    <div>
                      <div className="text-mono text-white/50">Ferramentas</div>
                      <ul className="mt-1 space-y-0.5">{active.tools.map((t) => <li key={t}>{t}</li>)}</ul>
                    </div>
                    <div>
                      <div className="text-mono text-white/50">Serviços</div>
                      <ul className="mt-1 space-y-0.5">{active.services.map((s) => <li key={s}>{s}</li>)}</ul>
                    </div>
                    {active.credits.length > 0 && (
                      <div>
                        <div className="text-mono text-white/50">Créditos</div>
                        <ul className="mt-1 space-y-0.5">
                          {active.credits.map((credit) => (
                            <li key={`${credit.role}-${credit.name}`}>
                              <span className="text-white/50">{credit.role}:</span> {credit.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {active.videoUrl && (
                      <a
                        href={active.videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-mono border border-white/30 px-4 py-3 hover:border-white"
                      >
                        Assistir vídeo <ExternalLink size={14} />
                      </a>
                    )}
                    <a
                      href="#contact"
                      onClick={() => setActive(null)}
                      className="mt-4 inline-flex text-mono border border-white/30 px-4 py-3 hover:border-white"
                    >
                      Contratar editor <ArrowRight className="ml-2" size={14} />
                    </a>
                  </aside>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectMedia({
  project,
  className,
  controls = false,
}: {
  project: Project;
  className?: string;
  controls?: boolean;
}) {
  if (project.coverVideo) {
    return (
      <video
        src={project.coverVideo}
        poster={project.thumbnail}
        className={className}
        controls={controls}
        muted={!controls}
        loop
        playsInline
        autoPlay={!controls}
      />
    );
  }

  return <img src={project.thumbnail} alt={project.title} className={className} />;
}
