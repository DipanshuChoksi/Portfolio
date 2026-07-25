'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { saveMarkdownNote } from '@/app/actions/archive';
import { Edit2, Save, X } from 'lucide-react';
import NoteActions from '@/components/NoteActions';

export default function NoteEditor({ initialContent, slug, initialVisibility = 'public' }: { initialContent: string; slug: string; initialVisibility?: 'public' | 'private' }) {
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState(initialContent);
    const [visibility, setVisibility] = useState(initialVisibility);
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await saveMarkdownNote(slug, content);
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to save", error);
            alert("Failed to save note");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="w-full flex flex-col gap-4 -mt-16">
            <div className="flex justify-end mb-2 gap-4">
                <NoteActions content={content} slug={slug} />
                {!isEditing ? (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full bg-primary/10 text-primary transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-md border border-primary/20"
                    >
                        <Edit2 size={16} />
                        <span>Edit Note</span>
                    </button>
                ) : (
                    <div className="flex gap-2">
                        <button
                            onClick={() => {
                                setContent(initialContent);
                                setIsEditing(false);
                            }}
                            className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full bg-secondary text-secondary-foreground transition-all hover:bg-secondary/80 hover:shadow-md border border-border"
                            disabled={isSaving}
                        >
                            <X size={16} />
                            <span>Cancel</span>
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full bg-primary text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-md"
                        >
                            <Save size={16} />
                            <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
                        </button>
                    </div>
                )}
            </div>

            {isEditing ? (
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
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full min-h-125 p-4 rounded-xl border border-border bg-card font-mono text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="Write your markdown here..."
                    />
                </div>
            ) : (
                <div className="prose prose-lg dark:prose-invert max-w-none border border-transparent p-4">
                    <ReactMarkdown>{content}</ReactMarkdown>
                </div>
            )}
        </div>
    );
}
