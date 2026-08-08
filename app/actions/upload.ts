'use server';

import { getAuthStatus } from '@/app/actions/auth';

export async function pushImageToGitHub(fileName: string, base64Data: string, folder: string = 'public') {
    const { canEdit } = await getAuthStatus();
    if (!canEdit) {
        return { success: false, error: 'Unauthorized' };
    }

    const owner = process.env.GITHUB_REPO_OWNER;
    const repo = process.env.GITHUB_REPO_NAME;
    const token = process.env.GITHUB_ACCESS_TOKEN;

    if (!owner || !repo || !token) {
        return { success: false, error: 'GitHub credentials missing' };
    }

    // Clean up base64 string if it contains the data URI prefix (e.g., data:image/png;base64,...)
    const base64Content = base64Data.replace(/^data:image\/\w+;base64,/, '');
    
    // Create a safe, unique filename
    const safeName = fileName.replace(/[^a-zA-Z0-9.\-_]/g, '');
    const extIndex = safeName.lastIndexOf('.');
    const ext = extIndex !== -1 ? safeName.substring(extIndex) : '';
    const name = extIndex !== -1 ? safeName.substring(0, extIndex) : safeName;
    const uniqueFileName = `${name}-${Date.now()}${ext}`;
    
    const filePath = `${folder}/${uniqueFileName}`;
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;

    try {
        const putRes = await fetch(url, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/vnd.github.v3+json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: `Upload image ${uniqueFileName}`,
                content: base64Content,
            })
        });

        if (!putRes.ok) {
            const error = await putRes.json();
            return { success: false, error: error.message || 'Failed to push to GitHub' };
        }

        // Generate the raw GitHub user content URL (assuming 'main' branch) for immediate preview access
        // Note: Files pushed to the 'public' folder will also be available at '/filename' after the next Vercel deployment completes.
        const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/${filePath}`;
        
        return { success: true, url: rawUrl, filePath };
    } catch (error: any) {
        return { success: false, error: error.message || 'Unknown error occurred' };
    }
}
