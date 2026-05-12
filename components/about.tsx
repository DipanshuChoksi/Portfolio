import { aboutSection } from "@/interfaces";

const highlightPhrases = [
  "full-stack developer",
  "building scalable, user-centric web applications",
  "designing clean architectures",
  "optimizing performance",
];

function formatText(text: string) {
  // Split by newlines first to render actual paragraphs
  return text.split("\n").map((line, lineIndex) => {
    const regex = new RegExp(`(${highlightPhrases.join("|")})`, "gi");
    const parts = line.split(regex);

    return (
      <span key={lineIndex} className="block mb-4 last:mb-0">
        {parts.map((part, i) =>
          highlightPhrases.some((p) => p.toLowerCase() === part.toLowerCase()) ? (
            <span key={i} className="text-primary font-semibold">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  });
}

export default function About({ aboutContent }: { aboutContent: aboutSection }) {
  return (
    <section
      id="about"
      className="min-h-screen border-b py-20 border-border snap-start flex items-center"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="mb-12 animate-in slide-in-from-bottom-8 fade-in duration-1000">
          <h2 className="text-xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl mb-4 text-transparent bg-clip-text bg-linear-to-r from-primary to-accent inline-block">
            About Me
          </h2>
          <div className="h-1.5 w-20 bg-primary rounded-full"></div>
        </div>

        <div className="rounded-3xl border border-border bg-card/40 backdrop-blur-md p-8 md:p-12 max-w-4xl flex flex-col gap-6 shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30 animate-in slide-in-from-bottom-12 fade-in delay-150 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-linear-to-b from-primary to-accent opacity-80"></div>

          {aboutContent.map((para, idx) => (
            <p className="text-muted-foreground leading-relaxed text-lg sm:text-xl" key={idx}>
              {formatText(para)}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
