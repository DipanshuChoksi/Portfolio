import { BlogPage, BlogNode } from "@/interfaces";

/**
 * Fetches up to the first 10 blog post nodes for a Hashnode publication derived from `name`.
 *
 * @param name - The publication identifier (subdomain) without the `.hashnode.dev` suffix
 * @returns An array of `BlogNode` objects extracted from the publication's posts edges (empty array if none)
 */
export async function getBlogsList(name: string): Promise<BlogNode[]> {
  const stream = await fetch("https://gql.hashnode.com", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({
      query: `query Publication {
                publication(host: "${name}.hashnode.dev") {
                    isTeam
                    title
                    posts(first: 10) {
                        edges {
                            node {
                                id
                                slug
                                title
                                publication {
                                  domainInfo {
                                    hashnodeSubdomain
                                  }
                                }
                                brief
                                tags {
                                  name  
                                }
                                readTimeInMinutes
                                publishedAt
                                coverImage {
                                    url
                                }
                            }
                        }
                    }
                }
            }`,
    }),
  });
  const data = await stream.json();
  let nodeList: BlogNode[] = data?.data?.publication?.posts?.edges ?? [];
  return nodeList;
}

/**
 * Fetches a single blog post from Hashnode for the given host and slug.
 *
 * @param host - The publication host (without the `.hashnode.dev` suffix)
 * @param slug - The post slug
 * @returns The post object containing `id`, `title`, `content.html`, `publishedAt`, `coverImage.url`, `tags`, and `readTimeInMinutes`
 */
export async function fetchPost({
  host,
  slug,
}: {
  host: string;
  slug: string;
}): Promise<BlogPage> {
  const query = `
    query SinglePost($host: String!, $slug: String!) {
      publication(host: $host) {
        post(slug: $slug) {
          id
          title
          content {
            html
          }
          publishedAt
          coverImage {
            url
          }
          tags {
            name
          }
          readTimeInMinutes
        }
      }
    }
  `;
  const variables = { host: host + ".hashnode.dev", slug };

  const response = await fetch("https://gql.hashnode.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await response.json();
  return json.data.publication.post;
}