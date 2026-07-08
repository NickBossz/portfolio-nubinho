import { useEffect, useState } from "react";

function fmt(ms: number) {
  const total = Math.floor(ms / 1000);
  const h = String(Math.floor(total / 3600)).padStart(2, "0");
  const m = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
  const s = String(total % 60).padStart(2, "0");
  const f = String(Math.floor((ms % 1000) / (1000 / 24))).padStart(2, "0");
  return `${h}:${m}:${s}:${f}`;
}

export function Timecode({ className = "" }: { className?: string }) {
  const [ms, setMs] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => setMs(Date.now() - start), 41);
    return () => clearInterval(id);
  }, []);
  return <span className={`text-mono tabular-nums ${className}`}>{fmt(ms)}</span>;
}
