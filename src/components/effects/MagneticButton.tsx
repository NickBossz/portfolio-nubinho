import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface Props {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  strength?: number;
  as?: "button" | "a";
}

export function MagneticButton({ children, className, onClick, href, strength = 20, as = "button" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    x.set(((e.clientX - cx) / r.width) * strength * 2);
    y.set(((e.clientY - cy) / r.height) * strength * 2);
  };
  const reset = () => { x.set(0); y.set(0); };

  const Inner = as === "a" ? motion.a : motion.button;

  return (
    <motion.div ref={ref} onMouseMove={handleMove} onMouseLeave={reset} className="inline-block">
      <Inner
        href={href}
        onClick={onClick}
        style={{ x: sx, y: sy }}
        className={className}
        data-cursor="click"
      >
        {children}
      </Inner>
    </motion.div>
  );
}
