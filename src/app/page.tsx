import { Craft } from "@/components/Craft";
import { Hero } from "@/components/Hero";
import { ProcessFilm } from "@/components/ProcessFilm";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <ProcessFilm />
        <Craft />
      </main>
    </>
  );
}
