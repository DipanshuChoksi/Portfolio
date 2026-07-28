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

    // Push to GitHub asynchronously
    await pushToGitHub(finalSlug, content);

    return { success: true, slug: finalSlug };
}

async function pushToGitHub(slug: string, content: string) {
    const owner = process.env.GITHUB_REPO_OWNER;
    const repo = process.env.GITHUB_REPO_NAME;
    const token = process.env.GITHUB_ACCESS_TOKEN;

    if (!owner || !repo || !token) {
        console.warn('GitHub credentials missing. Skipping push to GitHub.');
        return;
    }

    const filePath = `content/archieve/${slug}.md`;
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;

    try {
        // 1. Check if file exists to get its SHA
        const getRes = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/vnd.github.v3+json',
            },
            cache: 'no-store'
        });

        let sha: string | undefined;
        if (getRes.ok) {
            const data = await getRes.json();
            sha = data.sha;
        }

        // 2. Create or update file
        const putRes = await fetch(url, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/vnd.github.v3+json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: `Update ${slug}.md via Archive Editor ${new Date().toISOString()}`,
                content: Buffer.from(content, 'utf-8').toString('base64'),
                ...(sha ? { sha } : {})
            })
        });

        if (!putRes.ok) {
            const error = await putRes.json();
            console.error('Failed to push to GitHub:', error);
        }
    } catch (error) {
        console.error('Error pushing to GitHub:', error);
    }
}
