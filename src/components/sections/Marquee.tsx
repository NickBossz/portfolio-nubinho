const words = [
  "VIDEO EDITING",
  "MOTION DESIGN",
  "COLOR GRADING",
  "STORYTELLING",
  "SOCIAL MEDIA",
  "POST-PRODUCTION",
];

function Row({ reverse = false, outline = false }: { reverse?: boolean; outline?: boolean }) {
  return (
    <div className="overflow-hidden py-3">
      <div className={reverse ? "marquee-track-reverse" : "marquee-track"}>
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="flex items-center gap-8">
            {words.map((w, j) => (
              <span
                key={j}
                className={`text-display text-6xl md:text-8xl leading-none ${
                  outline
                    ? "text-transparent"
                    : "text-white"
                }`}
                style={outline ? { WebkitTextStroke: "1px rgba(255,255,255,0.6)" } : undefined}
              >
                {w}
                <span className="mx-6 text-white/30">—</span>
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
