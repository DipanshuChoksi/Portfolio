"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveProject } from "@/app/actions/project";
import { Button } from "@/components/ui/button";
import { pushImageToGitHub } from "@/app/actions/upload";
import { useAuthStatus } from "@/hooks/useAuthStatus";
import NotAuthorized from "./NotAuthorized";

export default function ProjectEditor({ initialData, slug = "new-project" }: { initialData?: any; slug?: string }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [title, setTitle] = useState(initialData?.title || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [image, setImage] = useState(initialData?.image || "/placeholder.svg");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [tags, setTags] = useState(initialData?.tags?.join(", ") || "");
    const [github, setGithub] = useState(initialData?.links?.github || "");
    const [live, setLive] = useState(initialData?.links?.live || "");
    const [status, setStatus] = useState<'Active' | 'WIP'>(initialData?.status || "Active");

    const { canEdit, isLoggedIn } = useAuthStatus()

    if (!canEdit) {
        return <NotAuthorized isLoggedIn={isLoggedIn} actionText="add new projects" basePage="projects" />
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            setImage(URL.createObjectURL(file)); // Local preview
        }
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            let finalImageUrl = image;

            if (imageFile) {
                const reader = new FileReader();
                reader.readAsDataURL(imageFile);

                await new Promise((resolve, reject) => {
                    reader.onload = async () => {
                        try {
                            const base64Data = reader.result as string;
                            // Push to GitHub in public/projects folder
                            const ext = imageFile.name.split('.').pop();
                            const kebabTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                            const filename = `${kebabTitle || 'project'}.${ext}`;
                            const result = await pushImageToGitHub(filename, base64Data, 'public/projects');

                            if (result.success && result.url) {
                                finalImageUrl = result.url; // Use the raw GitHub URL for immediate display
                            } else {
                                console.error("Upload failed:", result.error);
                                alert(`Image upload failed: ${result.error}`);
                            }
                            resolve(null);
                        } catch (err) {
                            reject(err);
                        }
                    };
                    reader.onerror = reject;
                });
            }

            const data = {
                title,
                description,
                image: finalImageUrl,
                tags: tags.split(",").map((t: string) => t.trim()).filter(Boolean),
                links: { github, live },
                status
            };
            const result = await saveProject(slug, data);
            if (result.success) {
                router.push('/projects');
            }
        } catch (error) {
            console.error("Failed to save project", error);
            alert("Failed to save project");
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col gap-6 max-w-2xl mx-auto p-6 bg-card rounded-2xl border border-border">
            <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="w-full p-2 bg-background border border-border rounded-md"
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    rows={4}
                    className="w-full p-2 bg-background border border-border rounded-md"
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-2">Project Image</label>

                {image && image !== "/placeholder.svg" && (
                    <div className="mb-4">
                        <img src={image} alt="Preview" className="w-full max-w-sm rounded-lg object-cover border border-border" />
                    </div>
                )}

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full p-2 bg-background border border-border rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-2">Tags (comma separated)</label>
                <input
                    type="text"
                    value={tags}
                    onChange={e => setTags(e.target.value)}
                    className="w-full p-2 bg-background border border-border rounded-md"
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-2">GitHub URL</label>
                    <input
                        type="text"
                        value={github}
                        onChange={e => setGithub(e.target.value)}
                        className="w-full p-2 bg-background border border-border rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Live URL</label>
                    <input
                        type="text"
                        value={live}
                        onChange={e => setLive(e.target.value)}
                        className="w-full p-2 bg-background border border-border rounded-md"
                    />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                    value={status}
                    onChange={e => setStatus(e.target.value as any)}
                    className="w-full p-2 bg-background border border-border rounded-md"
                >
                    <option value="Active">Active</option>
                    <option value="WIP">WIP</option>
                </select>
            </div>

            <Button onClick={handleSave} disabled={loading} className="w-full mt-4">
                {loading ? "Saving..." : "Save Project"}
            </Button>
        </div>
    );
}
