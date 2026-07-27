import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import NoteEditor from '@/components/NoteEditor';
import { auth } from '@/auth';

export default async function NotePage({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    
    const session = await auth();
    const canEdit = !!session?.user?.email && !!process.env.ADMIN_EMAIL && 
                    session.user.email.trim().toLowerCase() === process.env.ADMIN_EMAIL.trim().toLowerCase();

    const filePath = path.join(process.cwd(), 'content', 'archieve', `${slug}.md`);

    if (!fs.existsSync(filePath)) {
        notFound();
    }

    const content = fs.readFileSync(filePath, 'utf-8');

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
                <NoteEditor initialContent={content} slug={slug} canEdit={canEdit} isLoggedIn={!!session?.user} />
            </div>
        </section>
    );
}

