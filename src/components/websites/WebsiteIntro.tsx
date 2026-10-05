import { EditorialFilm, type FilmScene } from "../page/EditorialFilm";

const scenes: FilmScene[] = [
  { label: "The ambition", title: <>Your business.<br />In focus.</>, copy: "Every business has a story worth understanding.", image: "/strategy/strategy-desk.webp" },
  { label: "The story", title: <>First, we find<br />what matters.</>, copy: "Your audience. Your point of view. A clear direction.", image: "/strategy/story.webp" },
  { label: "The craft", title: <>Then, we give<br />it a place.</>, copy: "Strategy, design and development. Considered together.", image: "/brand-identity/northline-collection.webp" },
  { label: "The next chapter", title: <>A website.<br />With purpose.</>, copy: "Botlane Studios. From the first conversation to launch.", image: "/hero.jpg" },
];

export function WebsiteIntro() {
  return (
    <EditorialFilm
      scenes={scenes}
      name="Botlane Studios: our approach to websites"
      signature="Botlane / Websites"
      summary="We understand your business, clarify its story, and bring strategy, design and development together to create a website with purpose."
    />
  );
}
