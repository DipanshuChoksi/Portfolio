'use server';

import fs from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';
import connectDB from '@/lib/connectDB';
import ArchiveNote from '@/models/ArchiveNote';

export async function saveMarkdownNote(
    slug: string, 
    content: string, 
    visibility: 'public' | 'private' = 'public',
    metadata?: { title?: string; info?: string; Topics?: string[]; Source?: { title: string; url: string; } }
) {
    let finalSlug = slug;
    
    if (finalSlug === 'new-note' && metadata?.title) {
        finalSlug = metadata.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        if (!finalSlug) finalSlug = `note-${Date.now()}`;
    }

    const dirPath = path.join(process.cwd(), 'content', 'archieve');

    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }

    const filePath = path.join(dirPath, `${finalSlug}.md`);
    fs.writeFileSync(filePath, content, 'utf-8');

    await connectDB();
    await ArchiveNote.findOneAndUpdate(
        { slug: finalSlug },
        {
            $setOnInsert: {
                date: new Date()
            },
            $set: { 
                visibility,
                ...(metadata?.title !== undefined && { title: metadata.title }),
                ...(metadata?.info !== undefined && { info: metadata.info }),
                ...(metadata?.Topics !== undefined && { Topics: metadata.Topics }),
                ...(metadata?.Source !== undefined && { Source: metadata.Source })
            }
        },
        { upsert: true, new: true }
    );

    revalidatePath(`/archieve/${finalSlug}`);
    revalidatePath('/archieve');
    return { success: true, slug: finalSlug };
}
