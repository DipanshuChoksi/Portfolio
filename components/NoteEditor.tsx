'use client';

import { useState } from 'react';
import { saveMarkdownNote } from '@/app/actions/archive';
import { Save, X } from 'lucide-react';
import NoteActions from '@/components/NoteActions';
import Link from 'next/link';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useAuthStatus } from '@/hooks/useAuthStatus';
import { ArchiveItem } from '@/interfaces/archieve';
import NotAuthorized from './NotAuthorized';

interface NoteEditorProps {
    initialContent: string;
    slug: string;
    initialVisibility?: 'public' | 'private';
    initialMetadata?: Partial<ArchiveItem>;
}

export default function NoteEditor({ initialContent, slug, initialVisibility = 'public', initialMetadata }: NoteEditorProps) {
    const router = useRouter();
    const [content, setContent] = useState(initialContent);
    const [visibility, setVisibility] = useState(initialVisibility);
    const [title, setTitle] = useState(initialMetadata?.title || '');
    const [info, setInfo] = useState(initialMetadata?.info || '');
    const [topics, setTopics] = useState(initialMetadata?.Topics?.join(', ') || '');
    const [sourceTitle, setSourceTitle] = useState(initialMetadata?.Source?.title || '');
    const [sourceUrl, setSourceUrl] = useState(initialMetadata?.Source?.url || '');
    const [isSaving, setIsSaving] = useState(false);

    // Auth state
    const { isLoggedIn, canEdit, authFetched } = useAuthStatus();

    if (authFetched && !canEdit) {
        return <NotAuthorized isLoggedIn={isLoggedIn} actionText='to edit notes' basePage='archive' />;
    }

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const response = await saveMarkdownNote(slug, content, visibility, {
                title,
                info,
                Topics: topics.split(',').map(t => t.trim()).filter(Boolean),
                Source: { title: sourceTitle, url: sourceUrl }
            });
            toast.success("Note saved successfully!");
            router.push(`/archieve/${response.slug}`);
        } catch (error) {
            console.error("Failed to save", error);
            toast.error("Failed to save note");
            setIsSaving(false);
        }
    };

    return (
        <div className="w-full flex flex-col gap-4 -mt-16">
            <div className="flex justify-end mb-2 gap-4">
                <NoteActions content={content} slug={slug} />
                <div className="flex gap-2">
                    <Link
                        href={slug === 'new-note' ? '/archieve' : `/archieve/${slug}`}
                        className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full bg-secondary text-secondary-foreground transition-all hover:bg-secondary/80 hover:shadow-md border border-border"
                    >
                        <X size={16} />
                        <span>Cancel</span>
                    </Link>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full bg-primary text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-md"
                    >
                        <Save size={16} />
                        <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-6 p-4 rounded-xl border border-border bg-card/50">
                    <span className="text-sm font-semibold text-muted-foreground">Visibility:</span>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="visibility"
                            value="public"
                            checked={visibility === 'public'}
                            onChange={(e) => setVisibility(e.target.value as 'public' | 'private')}
                            className="text-primary focus:ring-primary accent-primary"
                        />
                        <span className="text-sm font-medium">Public</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="visibility"
                            value="private"
                            checked={visibility === 'private'}
                            onChange={(e) => setVisibility(e.target.value as 'public' | 'private')}
                            className="text-primary focus:ring-primary accent-primary"
                        />
                        <span className="text-sm font-medium">Private</span>
                    </label>
                </div>

                <div className="flex flex-col gap-3 p-4 rounded-xl border border-border bg-card/50">
                    <label className="text-sm font-semibold text-muted-foreground">Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 rounded-md border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />

                    <label className="text-sm font-semibold text-muted-foreground">Description (info):</label>
                    <input type="text" value={info} onChange={(e) => setInfo(e.target.value)} className="w-full p-2 rounded-md border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />

                    <label className="text-sm font-semibold text-muted-foreground">Topics (comma separated):</label>
                    <input type="text" value={topics} onChange={(e) => setTopics(e.target.value)} className="w-full p-2 rounded-md border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />

                    <div className="flex gap-4">
                        <div className="flex-1 flex flex-col gap-2">
                            <label className="text-sm font-semibold text-muted-foreground">Source Title:</label>
                            <input type="text" value={sourceTitle} onChange={(e) => setSourceTitle(e.target.value)} className="w-full p-2 rounded-md border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                        </div>
                        <div className="flex-1 flex flex-col gap-2">
                            <label className="text-sm font-semibold text-muted-foreground">Source URL:</label>
                            <input type="text" value={sourceUrl} onChange={(e) => setSourceUrl(e.target.value)} className="w-full p-2 rounded-md border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                        </div>
                    </div>
                </div>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full min-h-125 p-4 rounded-xl border border-border bg-card font-mono text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Write your markdown here..."
                />
            </div>
        </div>
    );
}
