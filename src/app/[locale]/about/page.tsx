import type { Metadata } from "next";
import { AboutSection } from "@/components/sections/AboutSection";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "BioHealth Prodentia (BHP) — Canadian multinational delivering scientifically advanced infant nutrition. Leap to the future of infant nutrition.",
};

export default function AboutPage() {
  return <AboutSection />;
}
