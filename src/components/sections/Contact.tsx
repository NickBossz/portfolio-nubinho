import { Instagram, MessageCircle, Phone } from "lucide-react";
import { MagneticButton } from "../effects/MagneticButton";
import contact from "../../content/contact.json";
import socials from "../../content/socials.json";

const contacts = [
  { label: "Instagram", value: socials.instagramLabel, href: socials.instagram, icon: Instagram },
  { label: "Discord", value: socials.discord, href: "#", icon: MessageCircle },
  { label: "WhatsApp", value: socials.whatsapp, href: socials.whatsappHref, icon: Phone },
];

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-white/10 py-16 md:py-24">
      <div className="absolute inset-0 opacity-25">
        <img
          src="https://images.unsplash.com/photo-1511512578047-dfb367046420?w=2000&q=85"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/75" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="text-mono text-orange-500">{contact.eyebrow}</div>
        <h2 className="text-display mt-3 text-5xl leading-[0.9] md:text-7xl">
          {contact.title}
        </h2>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
          {contact.description}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <MagneticButton
            as="a"
            href={socials.whatsappHref}
            className="text-mono border border-white bg-white px-7 py-4 text-black transition hover:bg-transparent hover:text-white"
          >
            {contact.buttonLabel}
          </MagneticButton>
        </div>

        <div className="mt-10 grid gap-3 md:grid-cols-3">
          {contacts.map(({ label, value, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              className="group flex items-center gap-4 border border-white/10 bg-surface/70 p-4 transition hover:border-white/35"
              data-cursor="open"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/15 text-orange-500">
                <Icon size={18} />
              </span>
              <span>
                <span className="block text-mono text-white/40">{label}</span>
                <span className="mt-1 block text-sm text-white transition group-hover:translate-x-1">{value}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
