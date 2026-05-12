import { project } from "@/interfaces";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";

function ProjectCard({ project, index }: { project: project; index: number }) {
  return (
    <div
      className="group max-w-lg relative overflow-hidden rounded-2xl border border-border/50 bg-card/40 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/50 flex flex-col animate-in slide-in-from-bottom-8 fade-in"
      style={{ animationDelay: `${(index % 3) * 150}ms`, animationFillMode: "both" }}
    >
      <div className="relative h-56 w-full shrink-0 overflow-hidden bg-secondary/50">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          height={200}
          width={350}
          loading="eager"
        />

        <div className="absolute top-4 right-4 translate-y-[-20px] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="bg-primary/90 text-primary-foreground text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider backdrop-blur-md shadow-lg flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
            {project.status}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col grow">
        <h3 className="mb-3 text-2xl font-bold group-hover:text-primary transition-colors flex items-center justify-between">
          {project.title}
          <ExternalLink
            size={18}
            className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-primary"
          />
        </h3>
        <p className="mb-6 text-sm text-muted-foreground/90 leading-relaxed">
          {project.description}
        </p>

        <div className="mb-8 flex flex-wrap gap-2 mt-auto">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="cursor-default inline-flex items-center rounded-full bg-secondary/80 border border-border/50 px-3 py-1 text-[11px] font-semibold text-foreground transition-all group-hover:border-primary/30 group-hover:bg-primary/5"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-3 mt-4 shrink-0">
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-border/60 bg-background/50 px-4 py-2.5 text-sm font-semibold transition-all hover:bg-secondary hover:text-primary hover:border-primary/40 focus:ring-2 focus:ring-primary/20"
          >
            <Github size={16} />
            <span>Source</span>
          </a>
          <a
            href={project.links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary/90 px-4 py-2.5 text-sm font-bold text-primary-foreground transition-all hover:bg-primary hover:shadow-[0_0_20px_rgba(13,148,136,0.4)] focus:ring-2 focus:ring-primary/50 group/btn"
          >
            <span>Visit</span>
            <ExternalLink
              size={16}
              className="transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
