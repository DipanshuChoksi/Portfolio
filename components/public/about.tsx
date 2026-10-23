import { aboutSection } from "@/interfaces";

const highlightPhrases = [
  "scalable applications",
  "backend engineering",
  "understanding"
  // "performance optimization",
];

function formatText(text: string) {
  return text.split("\n").map((line, lineIndex) => {
    const regex = new RegExp(`(${highlightPhrases.join("|")})`, "gi");
    const parts = line.split(regex);

    return (
      <span key={lineIndex} className="block mb-4 last:mb-0">
        {parts.map((part, i) =>
          highlightPhrases.some((p) => p.toLowerCase() === part.toLowerCase()) ? (
            <span key={i} className="text-foreground font-semibold">
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
      className="relative min-h-svh md:h-screen flex flex-col justify-start items-center bg-background/50 snap-start px-4 sm:px-6 lg:px-8 pt-24 md:pt-40"
    >
      <div className="mx-auto max-w-6xl w-full">
        <div className="mb-10 animate-in slide-in-from-bottom-8 fade-in duration-1000">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-3xl lg:text-3xl mb-4 text-transparent bg-clip-text bg-linear-to-r from-primary to-primary/80 inline-block">
            About Me
          </h2>
          <div className="h-1.5 w-20 bg-primary rounded-full"></div>
        </div>

        <div className="max-w-195 flex flex-col gap-6 text-[17px] sm:text-[18px] leading-[1.75] text-muted-foreground">
          {aboutContent.map((para, idx) => (
            <div key={idx}>
              {formatText(para)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
