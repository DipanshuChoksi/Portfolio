export type ArchiveItem = {
    slug: string;
    Topics: string[];
    info: string;
    Source: {
        title: string;
        url: string;
    };
    date: Date;
    visibility: 'public' | 'private';
};
