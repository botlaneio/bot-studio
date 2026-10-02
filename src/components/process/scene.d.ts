export function mountProcessScene(opts: {
  /** The tall scroll section whose progress drives the scene. */
  track: HTMLElement;
  /** Where the canvas is placed; the scene fills it. */
  mount: HTMLElement;
  /** An overlay for the launch flash. */
  flash: HTMLElement;
  /** Hero tile, then the three cards. */
  images: string[];
}): () => void;
