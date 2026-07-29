"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveProject } from "@/app/actions/project";
import { Button } from "@/components/ui/button";
import { pushImageToGitHub } from "@/app/actions/upload";
import { useAuthStatus } from "@/hooks/useAuthStatus";
import NotAuthorized from "./NotAuthorized";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const projectSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    tags: z.string().optional(),
    github: z.string().url("Must be a valid URL").optional().or(z.literal('')),
    live: z.string().url("Must be a valid URL").optional().or(z.literal('')),
    status: z.enum(['Active', 'WIP']),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export default function ProjectEditor({ initialData, slug = "new-project" }: { initialData?: any; slug?: string }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(initialData?.image || "/placeholder.svg");
    const [imageFile, setImageFile] = useState<File | null>(null);

    const { canEdit, isLoggedIn } = useAuthStatus()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProjectFormValues>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            title: initialData?.title || "",
            description: initialData?.description || "",
            tags: initialData?.tags?.join(", ") || "",
            github: initialData?.links?.github || "",
            live: initialData?.links?.live || "",
            status: initialData?.status || "Active",
        }
    });

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

    const onSubmit = async (data: ProjectFormValues) => {
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
                            const ext = imageFile.name.split('.').pop();
                            const kebabTitle = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                            const filename = `${kebabTitle || 'project'}.${ext}`;
                            const result = await pushImageToGitHub(filename, base64Data, 'public/projects');

                            if (result.success && result.url) {
                                finalImageUrl = result.url;
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

            const payload = {
                title: data.title,
                description: data.description,
                image: finalImageUrl as string,
                tags: data.tags ? data.tags.split(",").map((t: string) => t.trim()).filter(Boolean) : [],
                links: { github: data?.github ?? "", live: data?.live ?? "" },
                status: data.status
            };

            const result = await saveProject(slug, payload);
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
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 max-w-2xl mx-auto p-6 bg-card rounded-2xl border border-border">
            <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                    type="text"
                    {...register("title")}
                    className="w-full p-2 bg-background border border-border rounded-md"
                />
                {errors.title && <p className="text-destructive text-xs mt-1">{errors.title.message}</p>}
            </div>
            <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                    {...register("description")}
                    rows={4}
                    className="w-full p-2 bg-background border border-border rounded-md"
                />
                {errors.description && <p className="text-destructive text-xs mt-1">{errors.description.message}</p>}
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
                    {...register("tags")}
                    className="w-full p-2 bg-background border border-border rounded-md"
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-2">GitHub URL</label>
                    <input
                        type="text"
                        {...register("github")}
                        className="w-full p-2 bg-background border border-border rounded-md"
                    />
                    {errors.github && <p className="text-destructive text-xs mt-1">{errors.github.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Live URL</label>
                    <input
                        type="text"
                        {...register("live")}
                        className="w-full p-2 bg-background border border-border rounded-md"
                    />
                    {errors.live && <p className="text-destructive text-xs mt-1">{errors.live.message}</p>}
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                    {...register("status")}
                    className="w-full p-2 bg-background border border-border rounded-md"
                >
                    <option value="Active">Active</option>
                    <option value="WIP">WIP</option>
                </select>
            </div>

            <Button type="submit" disabled={loading} className="w-full mt-4">
                {loading ? "Saving..." : "Save Project"}
            </Button>
        </form>
    );
}
