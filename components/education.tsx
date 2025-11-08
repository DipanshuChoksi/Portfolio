import { educationHistory } from "@/consts";

export default function Education() {
  return (
    <section id="education" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold sm:text-4xl mb-3">Education</h2>
          <p className="text-muted-foreground max-w-2xl">
            My educational background and continuous learning journey in
            software development.
          </p>
        </div>

        <div className="space-y-6">
          {educationHistory.map((education, index) => (
            <div
              key={index}
              className="rounded-xl border border-border bg-card p-6 transition-all hover:border-accent hover:shadow-lg"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-3">
                <div>
                  <h3 className="text-lg font-semibold">{education.degree}</h3>
                  <p className="text-sm text-muted-foreground">
                    {education.school}
                  </p>
                </div>
                <span className="text-sm font-medium text-accent whitespace-nowrap">
                  {education.period}
                </span>
              </div>
              <p className="text-muted-foreground">{education.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
