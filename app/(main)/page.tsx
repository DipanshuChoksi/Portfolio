import Hero from "@/components/hero";
import About from "@/components/about";
import Education from "@/components/education";
import Achievements from "@/components/achievements";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import {
  aboutContent,
  achievementsContent,
  educationContent,
  heroContent,
  projectContent,
  skillContent,
} from "@/consts";

export default function Home() {
  return (
    <main className="flex-1 Home pt-20 sm:pt-0">
      <Hero heroContent={heroContent} />
      <About aboutContent={aboutContent} />
      <Achievements achievementsContent={achievementsContent} />
      <Projects projectsContent={projectContent} />
      <Skills skillsContent={skillContent} />
      <Education educationContent={educationContent} />
    </main>
  );
}
