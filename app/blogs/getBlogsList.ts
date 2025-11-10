import { BlogPage, BlogNode } from "@/interfaces";

export async function getBlogsList(name: string): Promise<BlogNode[]> {
  try {
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
    let nodeList: BlogNode[] = data?.data?.publication?.posts?.edges;
    if (nodeList) return nodeList;
  } catch (error) {
    console.error;
  }
  return [];
}

export async function fetchPost({
  host,
  slug,
}: {
  host: string;
  slug: string;
}): Promise<BlogPage | null> {
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

  try {
    const response = await fetch("https://gql.hashnode.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
    });
    const json = await response.json();
    return json?.data?.publication?.post;
  } catch (error) {
    console.error;
  }
  return null;
}
