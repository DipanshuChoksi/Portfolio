import fs from 'fs';
import path from 'path';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import connectDB from '@/lib/connectDB';
import ArchiveNote from '@/models/ArchiveNote';
import { getAuthStatus } from '@/app/actions/auth';
import { Edit2 } from 'lucide-react';
import RenderMarkdown from '@/components/RenderMarkdown';
import NoteEditor from '@/components/NoteEditor';
import { ArchiveItem } from '@/interfaces/archieve';

export default async function NotePage({ params, searchParams }: { params: { slug: string }, searchParams: { edit?: string } }) {
    const { slug } = await params;
    const { edit: editSearchParam } = await searchParams;
    const { canEdit, isLoggedIn } = await getAuthStatus();
    const isEditing = editSearchParam == "true";
    // If trying to edit without permission, redirect to view early to save a DB call
    if (isEditing && !canEdit) {
        redirect(`/archieve/${slug}`);
    }

    const filePath = path.join(process.cwd(), 'content', 'archieve', `${slug}.md`);

    if (!fs.existsSync(filePath)) {
        notFound();
    }

    const content = fs.readFileSync(filePath, 'utf-8');


    await connectDB();
    const dbNote = await ArchiveNote.findOne({ slug }).lean();

    const initialMetadata: Partial<ArchiveItem> | undefined = dbNote ? {
        title: dbNote.title,
        info: dbNote.info,
        Topics: dbNote.Topics,
        Source: dbNote.Source
    } : undefined;


    return (
        <section className="py-20 flex flex-col items-center snap-start w-full min-h-screen">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 w-full">
                {/* Verify if the user is editing or not. If the user is editing then render the NoteEditor or else render normal MarkdownRender RenderMarkdown coomponent. */}
                {isEditing ? (
                    <>
                        <div className="flex justify-between items-center w-full mb-8">
                            <Link href={`/archieve/${slug}`} className="text-primary inline-block group">
                                <span className="nav-link-underline">
                                    &larr; Back to Note
                                </span>
                            </Link>
                        </div>
                        <NoteEditor
                            initialContent={content}
                            slug={slug}
                            initialVisibility={dbNote?.visibility as 'public' | 'private' || 'public'}
                            initialMetadata={initialMetadata}
                        />
                    </>
                ) : (
                    <>
                        <div className="flex justify-between items-center w-full mb-8">
                            <Link href="/archieve" className="text-primary inline-block group">
                                <span className="nav-link-underline">
                                    &larr; Back to Archive
                                </span>
                            </Link>
                            <div className="flex gap-4">
                                {canEdit && (
                                    <Link
                                        href={`/archieve/${slug}?edit=true`}
                                        className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full bg-primary/10 text-primary transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-md border border-primary/20"
                                    >
                                        <Edit2 size={16} />
                                        <span>Edit Note</span>
                                    </Link>
                                )}
                            </div>
                        </div>
                        <RenderMarkdown title={initialMetadata?.title} content={content} />
                    </>
                )}
            </div>
        </section>
    );
}

