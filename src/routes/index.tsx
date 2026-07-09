import { createFileRoute } from "@tanstack/react-router";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { Hero } from "../components/sections/Hero";
import { Marquee } from "../components/sections/Marquee";
import { Projects } from "../components/sections/Projects";
import { Filmstrip } from "../components/sections/Filmstrip";
import { Services } from "../components/sections/Services";
import { About } from "../components/sections/About";
import { Skills } from "../components/sections/Skills";
import { Contact } from "../components/sections/Contact";
import { ScrollProgress } from "../components/effects/ScrollProgress";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <main className="relative bg-background text-foreground">
      <ScrollProgress />
      <Header />
      <Hero />
      <About />
      <Marquee />
      <Projects />
      <Filmstrip />
      <Services />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
