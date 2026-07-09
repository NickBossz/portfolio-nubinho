import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#projects", label: "Projetos" },
  { href: "#services", label: "Serviços" },
  { href: "#about", label: "Sobre" },
  { href: "#contact", label: "Contato" },
];

export function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 20);
    if (y > 200 && y > prev) setHidden(true);
    else setHidden(false);
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <motion.header
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors ${
          scrolled ? "border-white/10 bg-black/60 backdrop-blur-md" : "border-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-[4.5rem] md:px-8">
          <a href="#top" className="flex items-center gap-3" data-cursor="home">
            <span className="text-display text-2xl leading-none text-white">Nubinho</span>
          </a>

          <nav className="hidden items-center gap-10 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-cursor="go"
                className="text-mono text-[11px] text-white/70 transition hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              data-cursor="talk"
              className="hidden text-mono text-[11px] tracking-[0.15em] border border-white/30 px-4 py-2 transition hover:border-white hover:bg-white hover:text-black md:inline-block"
            >
              CONTRATAR EDITOR
            </a>
            <button
              onClick={() => setOpen(true)}
              className="text-white md:hidden"
              aria-label="Abrir menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex flex-col bg-black md:hidden"
          >
            <div className="flex h-16 items-center justify-between px-6">
              <span className="text-mono text-[11px] tracking-[0.2em]">MENU</span>
              <button onClick={() => setOpen(false)} aria-label="Fechar menu">
                <X size={22} />
              </button>
            </div>
            <nav className="flex flex-1 flex-col items-start justify-center gap-5 px-6">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="text-display text-5xl"
                >
                  {l.label}
                </motion.a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-6 text-mono border border-white/40 px-4 py-3"
              >
                CONTRATAR EDITOR
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
