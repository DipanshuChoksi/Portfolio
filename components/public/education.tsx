import { educationSection } from "@/interfaces";

export default function Education({ educationContent }: { educationContent: educationSection }) {
  return (
    <section id="education" className="border-b border-border snap-start flex items-center">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 w-full">
        <div className="mb-16 animate-in slide-in-from-bottom-8 fade-in duration-1000">
          <h2 className="text-3xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-linear-to-r from-primary to-accent inline-block">
            Education
          </h2>
          <div className="h-1.5 w-20 bg-primary rounded-full mb-6"></div>
          <p className="text-muted-foreground max-w-2xl text-lg sm:text-xl">
            {educationContent.description}
          </p>
        </div>

        <div className="space-y-4 max-w-4xl">
          {educationContent.history.map((education, index) => (
            <div
              key={index}
              className="rounded-2xl border border-border bg-card/40 backdrop-blur-md p-5 sm:p-6 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 relative overflow-hidden group animate-in slide-in-from-bottom-8 fade-in  delay-150"
            >
              {/* Animated decorative accent line that appears on hover */}
              <div className="absolute top-0 left-0 w-1.5 h-full bg-linear-to-b from-primary to-accent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-2">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-1">{education.degree}</h3>
                  <p className="text-sm sm:text-base font-medium text-muted-foreground">
                    {education.school}
                  </p>
                </div>
                <div className="inline-flex items-center">
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full whitespace-nowrap border border-primary/20">
                    {education.period}
                  </span>
                </div>
              </div>

              {education.description && (
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mt-3">
                  {education.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
