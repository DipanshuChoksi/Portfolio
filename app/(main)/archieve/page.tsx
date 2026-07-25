import ReadThisWeekComponent from "@/components/ReadThisWeekComponent";
import { ArchiveItem } from "@/interfaces/archieve";

export default function ArchievePage() {
    const dummyData: ArchiveItem[] = [
        {
            slug: "react-server-components",
            Topics: ["React", "Next.js"],
            info: "Understanding React Server Components in Next.js",
            Source: {
                title: "Next.js Docs",
                url: "https://nextjs.org/docs"
            },
            date: new Date(),
            visibility: "public"
        },
    ];

    return (
        <section className="py-20 flex flex-col items-center snap-start w-full">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full">
                <div className="mb-12 animate-in slide-in-from-bottom-8 fade-in duration-1000">
                    <h1 className="text-3xl font-extrabold tracking-tight sm:text-3xl lg:text-3xl mb-4 text-transparent bg-clip-text bg-linear-to-r from-primary to-accent inline-block">
                        Archive
                    </h1>
                    <div className="h-1.5 w-20 bg-primary rounded-full"></div>
                </div>
                <ReadThisWeekComponent items={dummyData} />
            </div>
        </section>
    );
}
