/** Default byline for Echoes. Future posts inherit this; there is no per-post author. */
export const ECHOES_AUTHOR = "Agent Lane";

export type Echo = {
  id: string;
  title: string;
  excerpt: string;
  note: string;
  image: string;
  featured?: boolean;
  kicker?: string;
};

/** Original notes. The card layout follows Whispers; the words do not. */
export const ECHOES: Echo[] = [
  {
    id: "intelligence-as-a-material",
    title: "Intelligence, used as a material",
    excerpt: "Treat the model as part of the product's structure, not a panel added after the design is finished.",
    note: "Note 01",
    image: "/craft/tile-1.jpg",
    featured: true,
    kicker: "From the studio notebook.",
  },
  {
    id: "what-a-first-sketch-is-for",
    title: "What a first sketch is for",
    excerpt: "A sketch is a decision you can throw away. It is not a promise to the next person in the file.",
    note: "Note 02",
    image: "/craft/tile-2.jpg",
  },
  {
    id: "the-quiet-parts",
    title: "Making the quiet parts visible",
    excerpt: "The work people remember is often the spacing, the pause, and the thing that was left out.",
    note: "Note 03",
    image: "/craft/tile-3.jpg",
  },
  {
    id: "handed-over",
    title: "A system that can be handed over",
    excerpt: "If the next person cannot run it without you in the room, it is not finished.",
    note: "Note 04",
    image: "/process/card-1.jpg",
  },
  {
    id: "pace",
    title: "Pace, and what it costs",
    excerpt: "Shipping fast is a choice about what you are willing to learn in public.",
    note: "Note 05",
    image: "/process/card-2.jpg",
  },
  {
    id: "before-the-build",
    title: "Notes before the build",
    excerpt: "Write the constraints down before the interface starts agreeing with everyone.",
    note: "Note 06",
    image: "/process/card-3.jpg",
  },
  {
    id: "after-launch",
    title: "The page after launch",
    excerpt: "Launch is the first time the work meets a person who did not brief it.",
    note: "Note 07",
    image: "/process/hero.jpg",
  },
];

export const ECHOES_AUTHOR_ROLE = "Studio notes";
