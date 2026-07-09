const words = [
  "GAMEPLAYS",
  "VÍDEOS LONGOS",
  "VÍDEOS CURTOS",
  "MOTION DESIGN",
  "THUMBNAILS",
  "RETENÇÃO",
];

function Row({ reverse = false, outline = false }: { reverse?: boolean; outline?: boolean }) {
  return (
    <div className="overflow-hidden py-2">
      <div className={reverse ? "marquee-track-reverse" : "marquee-track"}>
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="flex items-center gap-6">
            {words.map((w) => (
              <span
                key={w}
                className={`text-display text-4xl leading-none md:text-6xl ${
                  outline ? "text-transparent" : "text-white"
                }`}
                style={outline ? { WebkitTextStroke: "1px rgba(255,255,255,0.5)" } : undefined}
              >
                {w}
                <span className="mx-5 text-orange-500/70">/</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Marquee() {
  return (
    <section aria-hidden className="border-y border-white/10 bg-background-secondary">
      <Row />
      <Row reverse outline />
    </section>
  );
}
