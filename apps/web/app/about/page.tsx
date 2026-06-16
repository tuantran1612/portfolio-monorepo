import { AboutHero } from "@/components/about/about-hero";
import { AboutBio } from "@/components/about/about-bio";
import { AboutExperience } from "@/components/about/about-experience";
import { AboutStack } from "@/components/about/about-stack";
import { AboutCta } from "@/components/about/about-cta";
import type { Metadata } from "next";
import { Values } from "@/components/homepage/value";

export const metadata: Metadata = {
  title: "About",
  description:
    "Mid-level full stack developer based in Ho Chi Minh City, Vietnam. Passionate about clean code, great UX, and solving real problems.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutBio />
      <AboutExperience />
      <Values />
      <AboutCta />
    </>
  );
}
