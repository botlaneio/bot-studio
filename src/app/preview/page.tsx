import type { Metadata } from "next";
import { ClayPreview } from "@/components/preview/ClayPreview";

export const metadata: Metadata = {
  title: "Preview: clay direction",
  description: "A private design preview of a light, tactile direction for Botlane Studios.",
  robots: { index: false, follow: false },
};

export default function PreviewPage() {
  return <ClayPreview />;
}
