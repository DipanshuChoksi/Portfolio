import { aboutPara } from "@/consts";

/**
 * Renders an "About Me" section containing a styled card of paragraphs.
 *
 * Maps over the imported `aboutPara` array and renders each entry as a paragraph
 * inside a rounded, bordered card within a responsive container.
 *
 * @returns A React element representing the About section
 */
export default function About() {
  return (
    <section id="about" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold sm:text-4xl mb-3">About Me</h2>
        </div>

        <div className="rounded-xl border border-border bg-card p-8 max-w-3xl flex flex-col gap-4">
          {aboutPara.map((para, idx) => (
            <p className="text-muted-foreground leading-relaxed" key={idx}>
              {para}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}