import Hero from "@/components/hero";
import About from "@/components/about";
import Education from "@/components/education";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import Interests from "@/components/interests";

/**
 * Root page component that composes the application's main sections.
 *
 * @returns A JSX element containing a <main> element with the Hero, About, Education, Projects, Skills, and Interests components rendered in that order.
 */
export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <About />
      <Education />
      <Projects />
      <Skills />
      <Interests />
    </main>
  );
}