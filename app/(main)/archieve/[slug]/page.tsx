import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import Link from "next/link";
import connectDB from "@/lib/connectDB";
import ArchiveNote from "@/models/ArchiveNote";
import RenderMarkdown from "@/components/RenderMarkdown";
import { ArchiveItem } from "@/interfaces/archieve";
import NoteActions from "@/components/NoteActions";
import NotAuthorized from "@/components/NotAuthorized";
import { getAuthStatus } from "@/app/actions/auth";

export default async function NotePage({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const { canEdit } = await getAuthStatus();

    await connectDB();
    const dbNote = await ArchiveNote.findOne({ slug }).lean();

    if (dbNote?.visibility === "private" && !canEdit) {
        return (
            <section className="py-20 flex flex-col items-center snap-start w-full min-h-screen">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 w-full">
                    <div className="flex justify-between items-center w-full mb-8">
                        <Link href="/archieve" className="text-primary inline-block group">
                            <span className="nav-link-underline">&larr; Back to Archive</span>
                        </Link>
                    </div>
                    <NotAuthorized actionText="view this note" isLoggedIn={false} basePage="archieve" />
                </div>
            </section>
        );
    }

    const filePath = path.join(process.cwd(), "content", "archieve", `${slug}.md`);

    if (!fs.existsSync(filePath)) {
        notFound();
    }

    const content = fs.readFileSync(filePath, "utf-8");

    const initialMetadata: Partial<ArchiveItem> | undefined = dbNote
        ? {
            title: dbNote.title,
            info: dbNote.info,
            Topics: dbNote.Topics,
            Source: dbNote.Source,
        }
        : undefined;

    return (
        <section className="py-20 flex flex-col items-center snap-start w-full min-h-screen">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 w-full">
                <div className="flex justify-between items-center w-full mb-8">
                    <Link href="/archieve" className="text-primary inline-block group">
                        <span className="nav-link-underline">&larr; Back to Archive</span>
                    </Link>
                    <div className="flex gap-4">
                        <NoteActions content={content || ""} slug={slug} />
                    </div>
                </div>
                <RenderMarkdown title={initialMetadata?.title} content={content} />
            </div>
        </section>
    );
}
