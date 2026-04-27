import { skillsSection } from "@/interfaces";

export default function Skills({ skillsContent }: { skillsContent: skillsSection }) {
  return (
    <section id="skills" className="border-b border-border h-screen snap-start">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold sm:text-4xl mb-3">Skills & Technologies</h2>
          <p className="text-muted-foreground max-w-3xl">{skillsContent.description}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {skillsContent.skills_items.map((category) => (
            <div
              key={category.category}
              className="rounded-xl border border-border bg-card p-6 transition-all hover:border-accent hover:shadow-lg"
            >
              <h3 className="mb-4 text-lg font-semibold">{category.category}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg bg-secondary px-3 py-1 text-sm text-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
