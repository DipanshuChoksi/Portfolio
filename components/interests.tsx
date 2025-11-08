import { interests } from "@/consts";

export default function Interests() {
  return (
    <section id="interests" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold sm:text-4xl mb-3">
            Interests & Passions
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Areas I'm passionate about and actively exploring in my career.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {interests.map((interest) => (
            <div
              key={interest.title}
              className="rounded-xl border border-border bg-card p-6 transition-all hover:border-accent hover:shadow-lg"
            >
              <h3 className="mb-2 text-lg font-semibold">{interest.title}</h3>
              <p className="text-sm text-muted-foreground">
                {interest.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
