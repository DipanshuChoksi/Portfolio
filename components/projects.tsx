"use client";

import { projectSection } from "@/interfaces";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

export default function Projects({ projectsContent }: { projectsContent: projectSection }) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = direction === "left" ? -420 : 420;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section
      id="projects"
      className="border-b border-border py-20 flex items-center bg-background/50 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="animate-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl mb-4 text-transparent bg-clip-text bg-linear-to-r from-primary to-accent inline-block">
              Projects
            </h2>
            <div className="h-1.5 w-20 bg-primary rounded-full mb-6"></div>

            <p className="text-muted-foreground max-w-2xl text-base sm:text-lg">
              {projectsContent.description}
            </p>
          </div>

          {/* Slider Controls */}
          <div
            className="flex gap-4 animate-in slide-in-from-bottom-6 duration-700"
            style={{ animationDelay: "150ms", animationFillMode: "both" }}
          >
            <button
              onClick={() => scroll("left")}
              className="p-3 rounded-full border border-border/60 bg-card/40 backdrop-blur-md transition-all hover:bg-primary/10 hover:border-primary/50 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-sm"
              aria-label="Previous project"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-3 rounded-full border border-border/60 bg-card/40 backdrop-blur-md transition-all hover:bg-primary/10 hover:border-primary/50 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-sm"
              aria-label="Next project"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
          <style
            dangerouslySetInnerHTML={{
              __html: `
            .hide-scrollbar::-webkit-scrollbar { display: none; }
            .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `,
            }}
          />
          <div
            ref={sliderRef}
            className="flex items-stretch overflow-x-auto snap-x snap-mandatory gap-8 pb-12 pt-4 hide-scrollbar"
          >
            {projectsContent.projects.map((project, index) => (
              <div
                key={index}
                className="w-[85vw] sm:w-[400px] shrink-0 snap-center group relative overflow-hidden rounded-2xl border border-border/50 bg-card/20 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/50 flex flex-col animate-in slide-in-from-bottom-6"
                style={{ animationDelay: `${index * 150}ms`, animationFillMode: "both" }}
              >
                <div className="relative h-56 w-full shrink-0 overflow-hidden bg-secondary/50 z-10">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    height={200}
                    width={350}
                  />

                  {/* Top Right Badge appearing on hover */}
                  <div className="absolute top-4 right-4 translate-y-[-20px] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="bg-primary/90 text-primary-foreground text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider backdrop-blur-md shadow-lg flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                      {project.status}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col grow relative z-10">
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
                        className="inline-flex items-center rounded-full bg-secondary/80 border border-border/50 px-3 py-1 text-[11px] font-semibold text-foreground transition-all group-hover:border-primary/30 group-hover:bg-primary/5"
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
