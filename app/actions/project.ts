'use server';

import { revalidatePath } from 'next/cache';
import connectDB from '@/lib/connectDB';
import Project from '@/models/Project';

export async function saveProject(
    slug: string,
    data: {
        title: string;
        description: string;
        image: string;
        tags: string[];
        links: { github: string; live: string; };
        status: 'Active' | 'WIP';
    }
) {
    let finalSlug = slug;

    if (finalSlug === 'new-project') {
        finalSlug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        if (!finalSlug) finalSlug = `project-${Date.now()}`;
    }

    await connectDB();
    await Project.findOneAndUpdate(
        { slug: finalSlug },
        {
            $set: {
                title: data.title,
                description: data.description,
                image: data.image,
                tags: data.tags,
                links: data.links,
                status: data.status,
            }
        },
        { upsert: true, new: true }
    );

    revalidatePath('/');
    revalidatePath('/projects');

    return { success: true, slug: finalSlug };
}
