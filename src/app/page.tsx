import type { Metadata } from "next";
import { Craft } from "@/components/Craft";
import { Hero } from "@/components/Hero";
import { ProcessFilm } from "@/components/ProcessFilm";
import { WorkTeaser } from "@/components/WorkTeaser";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <ProcessFilm />
        <WorkTeaser />
        <Craft />
      </main>
    </>
  );
}
