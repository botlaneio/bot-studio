import { Craft } from "@/components/Craft";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { ProcessFilm } from "@/components/ProcessFilm";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <ProcessFilm />
        <Craft />
      </main>
      <Footer />
    </>
  );
}
