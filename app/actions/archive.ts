'use server';

import fs from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';

export async function saveMarkdownNote(slug: string, content: string) {
    const dirPath = path.join(process.cwd(), 'content', 'archieve');

    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }

    const filePath = path.join(dirPath, `${slug}.md`);
    fs.writeFileSync(filePath, content, 'utf-8');

    revalidatePath(`/archieve/${slug}`);
    return { success: true };
}
