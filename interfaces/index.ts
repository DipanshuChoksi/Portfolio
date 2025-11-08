export interface BlogNode {
  node: {
    id: string;
    slug: string;
    title: string;
    publication: {
      domainInfo: {
        hashnodeSubdomain: string;
      };
    };
    brief: string;
    tags: { name: string }[];
    readTimeInMinutes: number;
    publishedAt: string;
    coverImage: {
      url: string;
    };
  };
}

export interface BlogPage {
  id: string;
  title: string;
  content: {
    markdown: string;
    html: string;
  };
  publishedAt: string;
  url: string;
  coverImage: {
    url: string;
  };
  tags: { name: string }[];
  readTimeInMinutes: number;
}
