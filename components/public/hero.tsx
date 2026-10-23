import Link from "next/link";
import Image from "next/image";
import { heroSection } from "@/interfaces";
import { cn } from "@/lib/utils";
import { TypewriterRole } from "@/components/typewriter-role";

export default function Hero({ heroContent }: { heroContent: heroSection }) {
  return (
    <section
      id="hero"
      className="relative min-h-svh md:h-screen flex flex-col justify-center items-center snap-start px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-0"
    >
      <div className="mx-auto max-w-6xl w-full">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-3 sm:gap-8 md:gap-16 items-center justify-center">
          {/* Avatar */}
          <div className="flex items-center justify-center order-first md:order-last animate-in slide-in-from-top-6 md:slide-in-from-right-8 fade-in duration-1000 delay-150 fill-mode-both">
            <div className="relative flex items-center justify-center h-37 w-37 sm:h-52 sm:w-52 md:h-80 md:w-80 lg:h-96 lg:w-96 rounded-full bg-linear-to-br from-primary/5 to-accent/5 p-1.5 sm:p-2.5 md:p-3.5 shadow-sm md:shadow-md shadow-primary/3">
              <Image
                src={heroContent.image_path}
                alt="It's me (Dipanshu Choksi)"
                className="object-cover object-center h-full w-full rounded-full border border-border/40 sm:border-2"
                height={400}
                width={400}
                priority
              />
            </div>
          </div>

          {/* Hero Text & Actions */}
          <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left animate-in slide-in-from-bottom-6 fade-in duration-1000">
            <h1 className="text-[2.25rem] sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              {heroContent.name}
            </h1>
            <p className="mt-1.5 mb-4 sm:mb-5 text-lg sm:text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-primary/80 to-primary/60 min-h-7 sm:min-h-9">
              <TypewriterRole role={heroContent.role} />
            </p>
            <p className="mb-6 sm:mb-8 max-w-md text-[16px] sm:text-[17px] text-muted-foreground leading-[1.6]">
              {heroContent.description}
            </p>

            <div className="flex gap-3 sm:gap-4">
              {heroContent.call_to_action.map((item, idx) => (
                <Link
                  key={item.name}
                  href={item.url}
                  className={cn(
                    "inline-flex items-center justify-center rounded-full text-sm font-semibold transition-all h-12 px-6 whitespace-nowrap active:scale-[0.97] active:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    idx === 0
                      ? "bg-primary text-primary-foreground shadow-md hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5"
                      : "border border-input bg-background hover:bg-accent/10 hover:text-primary hover:border-primary/50"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Animated Scroll Down Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center justify-center">
        <Link
          href="/#about"
          aria-label="Scroll down"
          className="group inline-flex items-center text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-neutral-400 hover:text-foreground transition-all duration-300 animate-bounce focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full px-3 py-1.5"
        >
          <span className="group-hover:text-primary transition-colors">
            Scroll down
          </span>
        </Link>
      </div>
    </section>
  );
}
