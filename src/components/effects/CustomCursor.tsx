import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [label, setLabel] = useState<string>("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
      const t = e.target as HTMLElement | null;
      const el = t?.closest?.("[data-cursor]") as HTMLElement | null;
      setLabel(el?.dataset.cursor ?? "");
    };
    const leave = () => setVisible(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
    };
  }, []);

  const expanded = !!label;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:flex items-center justify-center rounded-full border border-white/60 mix-blend-difference"
      animate={{
        x: pos.x - (expanded ? 40 : 8),
        y: pos.y - (expanded ? 40 : 8),
        width: expanded ? 80 : 16,
        height: expanded ? 80 : 16,
        opacity: visible ? 1 : 0,
        backgroundColor: expanded ? "rgba(245,245,245,0.95)" : "rgba(245,245,245,0)",
      }}
      transition={{ type: "spring", stiffness: 500, damping: 40, mass: 0.4 }}
    >
      {expanded && (
        <span className="text-mono text-[10px] font-medium text-black tracking-wider">
          {label}
        </span>
      )}
    </motion.div>
  );
}
