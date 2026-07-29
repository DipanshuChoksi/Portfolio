import ReadThisWeekComponent from "@/components/ReadThisWeekComponent";
import { ArchiveItem } from "@/interfaces/archieve";
import connectDB from "@/lib/connectDB";
import ArchiveNote from "@/models/ArchiveNote";
import Link from "next/link";

export const metadata = {
    title: "Archive | Dipanshu Choksi",
    description: "A comprehensive list of what I'm learning.",
};
export default async function ArchievePage() {
    await connectDB();


    // Fetch notes from MongoDB
    const dbNotes = await ArchiveNote.find({}).sort({ date: -1 }).lean();

    const notes: ArchiveItem[] = dbNotes.map(note => ({
        slug: note.slug,
        title: note.title,
        Topics: note.Topics,
        info: note.info,
        Source: note.Source,
        date: note.date,
        visibility: note.visibility as 'public' | 'private'
    }));

    return (
        <section className="py-20 flex flex-col items-center snap-start w-full">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full">
                <div className="flex justify-between items-end mb-12 animate-in slide-in-from-bottom-8 fade-in duration-1000">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight sm:text-3xl lg:text-3xl mb-4 text-transparent bg-clip-text bg-linear-to-r from-primary to-accent inline-block">
                            Archive
                        </h1>
                        <div className="h-1.5 w-20 bg-primary rounded-full"></div>
                    </div>
                    <Link
                        href="/archieve/new"
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-colors shadow-md"
                    >
                        + New Note
                    </Link>
                </div>
                {notes.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-12 mt-8 border border-dashed border-border rounded-xl bg-card/50 text-center">
                        <h2 className="text-xl font-bold text-muted-foreground mb-2">No notes found</h2>
                        <p className="text-sm text-muted-foreground">Have not created any notes yet. Will do it soon!</p>
                    </div>
                ) : (
                    <ReadThisWeekComponent items={notes} />
                )}
            </div>
        </section>
    );
}
