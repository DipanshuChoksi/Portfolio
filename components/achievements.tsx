import { achievementsSection } from "@/interfaces";
import { ExternalLink } from "lucide-react";

export default function Achievements({
  achievementsContent,
}: {
  achievementsContent: achievementsSection;
}) {
  return (
    <section
      id="achievements"
      className="border-b border-border py-20 flex items-center bg-background/50 snap-start"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="mb-14 animate-in slide-in-from-bottom-8 fade-in duration-1000">
          <h2 className="text-3xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-linear-to-r from-primary to-accent inline-block">
            Achievements
          </h2>
          <div className="h-1.5 w-20 bg-primary rounded-full mb-6"></div>
          <p className="text-muted-foreground max-w-2xl text-base sm:text-lg">
            Competitions won, hackathons built, and courses completed.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Hackathons */}
          <div>
            <h3 className="text-base font-semibold uppercase tracking-widest text-primary mb-5 flex items-center gap-2">
              Hackathons & Competitions
            </h3>
            <div className="space-y-4">
              {achievementsContent.hackathons.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-border bg-card/40 backdrop-blur-md p-5 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-linear-to-b from-primary to-accent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <span className="inline-block text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full mb-2">
                        {item.title}
                      </span>
                      <h4 className="text-base font-semibold leading-snug">{item.event}</h4>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap mt-1">
                      {item.year}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {item.description}
                  </p>

                  {item.certificateUrl && (
                    <a
                      href={item.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                    >
                      View Certificate <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-base font-semibold uppercase tracking-widest text-primary mb-5 flex items-center gap-2">
              Certifications & Courses
            </h3>
            <div className="space-y-4">
              {achievementsContent.certifications.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-border bg-card/40 backdrop-blur-md p-5 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-linear-to-b from-primary to-accent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <span className="inline-block text-xs font-medium text-muted-foreground mb-2">
                        {item.issuer}
                      </span>
                      <h4 className="text-base font-semibold leading-snug">{item.title}</h4>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap mt-1">
                      {item.year}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {item.description}
                  </p>

                  {item.certificateUrl && (
                    <a
                      href={item.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                    >
                      View Certificate <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
