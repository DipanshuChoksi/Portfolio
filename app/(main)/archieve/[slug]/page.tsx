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
    const { canEdit } = await getAuthStatus();
    const isEditing = editSearchParam == "true";
    // If trying to edit without permission, redirect to view early to save a DB call
    if (isEditing && !canEdit) {
        redirect(`/archieve/${slug}`);
    }

    await connectDB();
    const dbNote = await ArchiveNote.findOne({ slug }).lean();

    if (dbNote?.visibility === 'private' && !canEdit) {
        return (
            <section className="py-20 flex flex-col items-center snap-start w-full min-h-screen">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 w-full">
                    <div className="flex justify-between items-center w-full mb-8">
                        <Link href="/archieve" className="text-primary inline-block group">
                            <span className="nav-link-underline">
                                &larr; Back to Archive
                            </span>
                        </Link>
                    </div>
                    <div className="flex flex-col items-center justify-center p-12 mt-8 border border-dashed border-destructive/30 rounded-xl bg-destructive/5 text-center">
                        <h2 className="text-2xl font-bold text-destructive mb-2">Private Note</h2>
                        <p className="text-muted-foreground mb-6">This is a private note. You must login with the admin email to access this.</p>
                        <Link href="/archieve" className="px-6 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium hover:bg-secondary/80 transition-colors border border-border">
                            Back to Archive
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

    const filePath = path.join(process.cwd(), 'content', 'archieve', `${slug}.md`);

    if (!fs.existsSync(filePath)) {
        notFound();
    }

    const content = fs.readFileSync(filePath, 'utf-8');

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

