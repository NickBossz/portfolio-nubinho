import { createFileRoute } from "@tanstack/react-router";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { Hero } from "../components/sections/Hero";
import { Marquee } from "../components/sections/Marquee";
import { Showreel } from "../components/sections/Showreel";
import { Projects } from "../components/sections/Projects";
import { Filmstrip } from "../components/sections/Filmstrip";
import { Services } from "../components/sections/Services";
import { Process } from "../components/sections/Process";
import { About } from "../components/sections/About";
import { Skills } from "../components/sections/Skills";
import { Testimonials } from "../components/sections/Testimonials";
import { Contact } from "../components/sections/Contact";
import { FilmGrain } from "../components/effects/FilmGrain";
import { CustomCursor } from "../components/effects/CustomCursor";
import { ScrollProgress } from "../components/effects/ScrollProgress";
import { LoadingScreen } from "../components/effects/LoadingScreen";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <main className="relative bg-background text-foreground">
      <LoadingScreen />
      <FilmGrain />
      <ScrollProgress />
      <CustomCursor />
      <Header />
      <Hero />
      <Marquee />
      <Showreel />
      <Projects />
      <Filmstrip />
      <Services />
      <Process />
      <About />
      <Skills />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
