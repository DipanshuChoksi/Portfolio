import ProjectCard from "@/components/ProjectCard";
import { projectContent } from "@/consts";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Projects | Dipanshu Choksi",
  description: "A showcase of my recent work and open source projects.",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen pt-6 pb-20 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="mb-12 animate-in slide-in-from-bottom-8 fade-in duration-1000">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6 group"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-4xl mb-6 text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">
            All Projects
          </h1>
          <div className="h-1.5 w-24 bg-primary rounded-full mb-8"></div>
          <p className="text-muted-foreground max-w-3xl text-lg sm:text-xl">
            A comprehensive list of my side projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {projectContent.projects.map((project, index) => (
            <ProjectCard project={project} index={index} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
