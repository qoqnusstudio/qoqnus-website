import { Fragment } from "react";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Mission from "@/components/sections/Mission";
import Services from "@/components/sections/Services";
import ProjectsPreview from "@/components/sections/ProjectsPreview";
import PhilosophyTeaser from "@/components/sections/PhilosophyTeaser";
import FounderTeaser from "@/components/sections/FounderTeaser";
import ContactCta from "@/components/sections/ContactCta";
import CustomSection from "@/components/sections/CustomSection";
import { getPublishedSections } from "@/lib/sections";

// Fixed anchor positions the admin's custom "home" sections slot
// between — e.g. a section with position 15 renders between About
// (10) and Mission (20). Multiples of 10 leave room to insert more
// fixed sections later without renumbering.
const ANCHORS: { position: number; node: React.ReactNode }[] = [
  { position: 0, node: <Hero /> },
  { position: 10, node: <About /> },
  { position: 20, node: <Mission /> },
  { position: 30, node: <Services /> },
  { position: 40, node: <ProjectsPreview /> },
  { position: 50, node: <PhilosophyTeaser /> },
  { position: 60, node: <FounderTeaser /> },
  { position: 70, node: <ContactCta /> },
];

export default async function HomePage() {
  const sections = await getPublishedSections("home");

  const items = [
    ...ANCHORS.map((a) => ({ position: a.position, order: 0, node: a.node })),
    ...sections.map((s) => ({
      position: s.position,
      order: 1,
      node: <CustomSection section={s} />,
    })),
  ].sort((a, b) => a.position - b.position || a.order - b.order);

  return (
    <>
      {items.map((item, i) => (
        <Fragment key={i}>{item.node}</Fragment>
      ))}
    </>
  );
}
