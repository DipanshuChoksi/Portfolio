import { aboutSection } from "@/interfaces";

export default function About({ aboutContent }: { aboutContent: aboutSection }) {
  return (
    <section id="about" className="min-h-screen border-b border-border snap-start">
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-28 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold sm:text-4xl mb-3">About Me</h2>
        </div>

        <div className="rounded-xl border border-border bg-card p-8 max-w-3xl flex flex-col gap-4">
          {aboutContent.map((para, idx) => (
            <p className="text-muted-foreground leading-relaxed text-lg" key={idx}>
              {para}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
