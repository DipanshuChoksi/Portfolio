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
  skillContent,
} from "@/consts";

import { SnapEnforcer } from "@/components/snap-enforcer";

import connectDB from "@/lib/connectDB";
import Project from "@/models/Project";
import { project, projectSection } from "@/interfaces";

export default async function Home() {
  await connectDB();
  const projects = await Project.find({}).sort({ createdAt: -1 }).lean();

  const formattedProjects = projects.map((p: project) => ({
    title: p.title,
    description: p.description,
    image: p.image,
    tags: p.tags,
    links: p.links,
    status: p.status,
  }))

  const projectSection: projectSection = {
    description: "A comprehensive list of my side projects.",
    projects: formattedProjects,
  }
    ;
  return (
    <main className="flex-1 Home pt-20 sm:pt-0">
      <SnapEnforcer />
      <Hero heroContent={heroContent} />
      <About aboutContent={aboutContent} />
      <Achievements achievementsContent={achievementsContent} />
      <Projects projectsContent={projectSection} />
      <Skills skillsContent={skillContent} />
      <Education educationContent={educationContent} />
    </main>
  );
}
