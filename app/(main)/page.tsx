import Hero from "@/components/hero";
import About from "@/components/about";
import Education from "@/components/education";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import Interests from "@/components/interests";
import {
  aboutContent,
  educationContent,
  heroContent,
  interestContent,
  projectContent,
  skillContent,
} from "@/consts";

import "../../index.css";

export default function Home() {
  return (
    <main className="flex-1 Home">
      <Hero heroContent={heroContent} />
      <About aboutContent={aboutContent} />
      <Education educationContent={educationContent} />
      <Projects projectsContent={projectContent} />
      <Skills skillsContent={skillContent} />
      <Interests interestContent={interestContent} />
    </main>
  );
}
