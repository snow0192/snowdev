import { About } from "@/components/about/about";
import { Stack } from "@/components/stack/stack";
import { GoatRealm } from "@/components/goatrealm/goatrealm";
import { Projects } from "@/components/projects/projects";
import { GitHubStrip } from "@/components/projects/github-strip";
import { Journey } from "@/components/journey/journey";
import { Contact } from "@/components/contact/contact";
import { BigCta } from "@/components/contact/big-cta";
import { Hero } from "@/components/hero/hero";
import { Marquee } from "@/components/ui/marquee";

const MARQUEE_ITEMS = [
  "Full-Stack",
  "Cloud",
  "Automation",
  "Developer Tools",
  "Open Source",
  "Infrastructure",
  "AI",
  "DevOps",
];

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee items={MARQUEE_ITEMS} />
      <About />
      <Stack />
      <GoatRealm />
      <Projects />
      <GitHubStrip />
      <Journey />
      <Contact />
      <Marquee items={MARQUEE_ITEMS} />
      <BigCta />
    </>
  );
}