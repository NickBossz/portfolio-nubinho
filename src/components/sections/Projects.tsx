import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { X, ArrowRight } from "lucide-react";
import projects from "../../data/projects.json";
import type { Project } from "../../types/project";

const CATEGORIES = ["TODOS", "Social Media", "Motion Design", "Comercial", "YouTube", "Eventos"];

export function Projects() {
  const all = projects as Project[];
  const [filter, setFilter] = useState("TODOS");
  const [active, setActive] = useState<Project | null>(null);

  const filtered = useMemo(
    () => (filter === "TODOS" ? all : all.filter((p) => p.category === filter)),
    [filter, all]
  );

  const activeIdx = active ? filtered.findIndex((p) => p.id === active.id) : -1;
  const nav = (dir: 1 | -1) => {
    if (activeIdx < 0) return;
    const next = filtered[(activeIdx + dir + filtered.length) % filtered.length];
    setActive(next);
  };

  return (
    <section id="projects" className="relative border-t border-white/10 py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="text-mono text-white/50">/ 02 — SELECTED WORK</div>
            <h2 className="text-display mt-2 text-6xl md:text-8xl">
              Projetos <span className="italic font-serif normal-case tracking-normal">selecionados</span>
            </h2>
          </div>
          <div className="text-mono text-white/50">{filtered.length.toString().padStart(2, "0")} PROJETOS</div>
        </div>

        <div className="mb-10 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => {
            const active = c === filter;
            return (
              <button
                key={c}
                onClick={() => setFilter(c)}
                data-cursor="click"
                className={`text-mono px-4 py-2 border transition ${
                  active
                    ? "border-white bg-white text-black"
                    : "border-white/20 text-white/70 hover:border-white/60 hover:text-white"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>

        <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => {
              const span =
                p.orientation === "portrait"
                  ? "md:col-span-5"
                  : i % 5 === 0
                  ? "md:col-span-12"
                  : "md:col-span-7";
              const aspect = p.orientation === "portrait" ? "aspect-[3/4]" : "aspect-[16/10]";
              return (
                <motion.button
                  key={p.id}
                  layout
                  layoutId={`card-${p.id}`}
                  onClick={() => setActive(p)}
                  data-cursor="OPEN"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className={`group relative overflow-hidden border border-white/10 bg-surface text-left ${span}`}
                >
                  <motion.div layoutId={`img-${p.id}`} className={`relative w-full ${aspect} overflow-hidden`}>
                    <img
                      src={p.thumbnail}
                      alt={p.title}
                      className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                    />
                    <div className="scanlines pointer-events-none absolute inset-0 opacity-40" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                    <div className="absolute left-4 top-4 flex items-center gap-3 text-mono text-white/80">
                      <span>N° {String(i + 1).padStart(2, "0")}</span>
                      <span className="text-white/40">·</span>
                      <span>{p.category}</span>
                    </div>
                    <div className="absolute right-4 top-4 text-mono text-white/80">{p.year}</div>
                    <div className="absolute inset-x-4 bottom-4">
                      <motion.h3 layoutId={`title-${p.id}`} className="text-display text-3xl md:text-5xl">
                        {p.title}
                      </motion.h3>
                      <div className="mt-2 flex items-center justify-between text-mono text-white/70">
                        <span className="line-clamp-1 max-w-[70%]">{p.shortDescription}</span>
                        <span className="flex items-center gap-1 opacity-0 transition group-hover:opacity-100">
                          VER PROJETO <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                    <div className="absolute right-4 bottom-4 text-mono text-white/70 opacity-100 group-hover:opacity-0 transition">
                      {p.duration}
                    </div>
                  </motion.div>
                </motion.button>
              );
            })}
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
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-black/70 px-6 py-4 backdrop-blur md:px-10">
                <span className="text-mono text-white/60">
                  {active.category} · {active.year} · {active.duration}
                </span>
                <div className="flex items-center gap-4">
                  <button onClick={() => nav(-1)} className="text-mono text-white/60 hover:text-white">← ANTERIOR</button>
                  <button onClick={() => nav(1)} className="text-mono text-white/60 hover:text-white">PRÓXIMO →</button>
                  <button
                    onClick={() => setActive(null)}
                    className="flex items-center gap-2 text-mono border border-white/30 px-3 py-1.5 hover:border-white"
                    aria-label="Fechar"
                  >
                    FECHAR <X size={16} />
                  </button>
                </div>
              </div>

              <motion.div layoutId={`card-${active.id}`} className="mx-auto max-w-[1600px] px-6 py-10 md:px-10">
                <motion.div layoutId={`img-${active.id}`} className="relative aspect-video overflow-hidden border border-white/15">
                  <img src={active.thumbnail} alt={active.title} className="h-full w-full object-cover" />
                </motion.div>

                <motion.h3
                  layoutId={`title-${active.id}`}
                  className="text-display mt-8 text-5xl md:text-8xl"
                >
                  {active.title}
                </motion.h3>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-10 grid gap-10 md:grid-cols-[2fr_1fr]"
                >
                  <div className="space-y-8">
                    <p className="text-xl leading-relaxed text-white/80">{active.fullDescription}</p>

                    <div>
                      <div className="text-mono text-white/50">/ DESAFIO</div>
                      <p className="mt-2 text-white/80">{active.challenge}</p>
                    </div>
                    <div>
                      <div className="text-mono text-white/50">/ SOLUÇÃO</div>
                      <p className="mt-2 text-white/80">{active.solution}</p>
                    </div>
                    <div>
                      <div className="text-mono text-white/50">/ RESULTADOS</div>
                      <ul className="mt-2 space-y-1 text-white/80">
                        {active.results.map((r) => (
                          <li key={r} className="flex gap-2"><span className="text-white/40">→</span>{r}</li>
                        ))}
                      </ul>
                    </div>

                    {active.gallery.length > 0 && (
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {active.gallery.map((g) => (
                          <img key={g} src={g} alt="" className="aspect-video w-full object-cover border border-white/10" />
                        ))}
                      </div>
                    )}
                  </div>

                  <aside className="space-y-6 border-l border-white/10 pl-6 text-sm">
                    <div>
                      <div className="text-mono text-white/50">CLIENTE</div>
                      <div className="mt-1">{active.client}</div>
                    </div>
                    <div>
                      <div className="text-mono text-white/50">FUNÇÃO</div>
                      <ul className="mt-1 space-y-0.5">{active.role.map((r) => <li key={r}>{r}</li>)}</ul>
                    </div>
                    <div>
                      <div className="text-mono text-white/50">FERRAMENTAS</div>
                      <ul className="mt-1 space-y-0.5">{active.tools.map((t) => <li key={t}>{t}</li>)}</ul>
                    </div>
                    <div>
                      <div className="text-mono text-white/50">SERVIÇOS</div>
                      <ul className="mt-1 space-y-0.5">{active.services.map((s) => <li key={s}>{s}</li>)}</ul>
                    </div>
                    <div>
                      <div className="text-mono text-white/50">CRÉDITOS</div>
                      <ul className="mt-1 space-y-0.5">
                        {active.credits.map((c) => <li key={c.role}><span className="text-white/50">{c.role}:</span> {c.name}</li>)}
                      </ul>
                    </div>
                    <a
                      href="#contact"
                      onClick={() => setActive(null)}
                      className="mt-4 inline-flex text-mono border border-white/30 px-4 py-3 hover:border-white"
                    >
                      TRABALHAR JUNTOS →
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
