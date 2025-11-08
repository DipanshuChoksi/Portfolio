"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Clock, Calendar, ArrowLeft, Divide } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchPost } from "../../getBlogsList";
import { useEffect, useState } from "react";
import { BlogPage } from "@/interfaces";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const host = params?.host as string;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [post, setPost] = useState<null | BlogPage>(null);

  useEffect(() => {
    setLoading(true);
    async function loadPost() {
      try {
        const data = await fetchPost({ host: host, slug: slug });
        setPost(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(
          error instanceof Error ? error?.message : "internal server error"
        );
      }
    }
    loadPost();
  }, [slug, host]);
  // getBlogsList();
  // const relatedPosts = post ? getRelatedPosts(slug) : [];

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Post not found</h1>
            <Link href="/blogs">
              <Button variant="outline">Back to blog</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {loading || error ? (
        <div>{loading ? <div>Loading...</div> : <div>{error}</div>}</div>
      ) : (
        <main className="flex-1">
          <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
            {/* Back button */}
            <Link href="/blogs" className="inline-block mb-8">
              <Button variant="outline" size="sm">
                <ArrowLeft className="size-4 mr-2" />
                Back to blog
              </Button>
            </Link>
            {/* Cover Image */}
            <div className="mb-8 overflow-hidden rounded-lg">
              <img
                src={post?.coverImage?.url || "/placeholder.svg"}
                alt={post.title}
                className="w-full h-96 object-cover"
              />
            </div>
            {/* Post Metadata */}
            <div className="mb-8">
              <h1 className="text-balance text-4xl font-bold mb-4">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="size-4" />
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="size-4" />
                  {post.readTimeInMinutes} min read
                </div>
              </div>
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag.name}
                    href={`/blogs?tag=${tag}`}
                    className="inline-block bg-secondary/50 text-secondary-foreground hover:bg-secondary text-xs px-3 py-1 rounded transition-colors"
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>
            </div>
            {/* Post Content */}
            <div className="prose prose-invert max-w-none mb-12">
              <div
                className="pose text-foreground dark:text-foreground"
                dangerouslySetInnerHTML={{ __html: post.content.html }}
              />
            </div>
            {/* Related Posts
            {relatedPosts.length > 0 && (
              <div className="mt-16 pt-8 border-t border-border">
                <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.slug}
                      href={`/blogs/${relatedPost.slug}`}
                      className="group rounded-lg border border-border p-4 transition-all hover:border-primary hover:shadow-lg"
                    >
                      <h3 className="font-semibold group-hover:text-primary transition-colors mb-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {relatedPost.description}
                      </p>
                      <div className="text-xs text-muted-foreground mt-3">
                        {relatedPost.readTime} min read
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )} */}
          </article>
        </main>
      )}
    </div>
  );
}
