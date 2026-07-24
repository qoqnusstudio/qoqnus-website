import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Mission from "@/components/sections/Mission";
import Services from "@/components/sections/Services";
import ProjectsPreview from "@/components/sections/ProjectsPreview";
import PhilosophyTeaser from "@/components/sections/PhilosophyTeaser";
import FounderTeaser from "@/components/sections/FounderTeaser";
import ContactCta from "@/components/sections/ContactCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Mission />
      <Services />
      <ProjectsPreview />
      <PhilosophyTeaser />
      <FounderTeaser />
      <ContactCta />
    </>
  );
}
