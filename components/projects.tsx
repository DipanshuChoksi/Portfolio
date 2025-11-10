import { projects } from "@/consts";
import { ExternalLink, Github } from "lucide-react";

/**
 * Render the "Featured Projects" section containing a responsive grid of project cards.
 *
 * Each card displays a project image (falls back to a placeholder), title, description,
 * tag badges, and action links for the project's source code and live site.
 *
 * @returns A React element containing the projects section with a grid of project cards
 */
export default function Projects() {
  return (
    <section id="projects" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold sm:text-4xl mb-3">
            Featured Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Here are some of my recent projects. Each one showcases different
            technologies and problem-solving approaches.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-accent hover:shadow-lg"
            >
              <div className="relative h-48 w-full overflow-hidden bg-secondary">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold">{project.title}</h3>
                <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                <div className="mb-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
                  >
                    <Github size={16} />
                    Code
                  </a>
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
                  >
                    <ExternalLink size={16} />
                    Live
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}