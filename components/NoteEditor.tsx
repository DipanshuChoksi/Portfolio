'use client';

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { saveMarkdownNote } from '@/app/actions/archive';
import { Edit2, Save, X, LogOut } from 'lucide-react';
import NoteActions from '@/components/NoteActions';
import { toast } from 'sonner';
import { login, logout } from '@/app/actions/auth';

interface NoteEditorProps {
    initialContent: string;
    slug: string;
    initialVisibility?: 'public' | 'private';
    canEdit?: boolean;
    isLoggedIn?: boolean;
}

export default function NoteEditor({ initialContent, slug, initialVisibility = 'public', canEdit = false, isLoggedIn = false }: NoteEditorProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState(initialContent);
    const [visibility, setVisibility] = useState(initialVisibility);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (isLoggedIn) {
            // Add a small delay to ensure the Toaster component is mounted before firing
            const timer = setTimeout(() => {
                if (canEdit) {
                    toast.success("You are authorized to edit notes.");
                } else {
                    toast.error("You are not authorized to edit notes.");
                }
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [isLoggedIn, canEdit]);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await saveMarkdownNote(slug, content);
            setIsEditing(false);
            toast.success("Note saved successfully!");
        } catch (error) {
            console.error("Failed to save", error);
            toast.error("Failed to save note");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="w-full flex flex-col gap-4 -mt-16">
            <div className="flex justify-end mb-2 gap-4">
                <NoteActions content={content} slug={slug} />
                {/* If the user is editing then show the cancel and save buttons else show the edit button or login to edit button. */}
                {!isEditing ? (
                    canEdit ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full bg-primary/10 text-primary transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-md border border-primary/20"
                        >
                            <Edit2 size={16} />
                            <span>Edit Note</span>
                        </button>
                    ) : (
                        <button
                            onClick={() => login()}
                            className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full bg-primary/10 text-primary transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-md border border-primary/20"
                        >
                            <Edit2 size={16} />
                            <span>Sign in to Edit</span>
                        </button>
                    )
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

            {isLoggedIn && (
                <div className="flex justify-end mt-8 border-t border-border pt-8 pb-4">
                    <button
                        onClick={() => {
                            toast.success("Logged out successfully");
                            setTimeout(() => {
                                logout();
                            }, 500);
                        }}
                        className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full bg-secondary/50 text-muted-foreground transition-all hover:bg-destructive hover:text-destructive-foreground hover:shadow-md border border-border"
                    >
                        <LogOut size={16} />
                        <span>Sign Out</span>
                    </button>
                </div>
            )}
        </div>
    );
}
