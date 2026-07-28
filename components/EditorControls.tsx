'use client';

import { Edit2, Save, X } from 'lucide-react';

interface EditorControlsProps {
    isEditing: boolean;
    canEdit: boolean;
    isSaving: boolean;
    setIsEditing: (value: boolean) => void;
    onCancel: () => void;
    onSave: () => void;
    onLogin: () => void;
}

export default function EditorControls({
    isEditing,
    canEdit,
    isSaving,
    setIsEditing,
    onCancel,
    onSave,
    onLogin
}: EditorControlsProps) {

    // If not editing and user is authorized to edit then show the edit button else show the login to edit button.
    if (!isEditing) {
        if (canEdit) {
            return (
                <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full bg-primary/10 text-primary transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-md border border-primary/20"
                >
                    <Edit2 size={16} />
                    <span>Edit Note</span>
                </button>
            );
        } else {
            return (
                <button
                    onClick={onLogin}
                    className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full bg-primary/10 text-primary transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-md border border-primary/20"
                >
                    <Edit2 size={16} />
                    <span>Sign in to Edit</span>
                </button>
            );
        }
    }

    // User is editing. 
    return (
        <div className="flex gap-2">
            <button
                onClick={onCancel}
                className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full bg-secondary text-secondary-foreground transition-all hover:bg-secondary/80 hover:shadow-md border border-border"
                disabled={isSaving}
            >
                <X size={16} />
                <span>Cancel</span>
            </button>
            <button
                onClick={onSave}
                disabled={isSaving}
                className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full bg-primary text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-md"
            >
                <Save size={16} />
                <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
            </button>
        </div>
    );
}
