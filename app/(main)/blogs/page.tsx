"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getBlogsList } from "./getBlogsList";
import { blogsList, tagsList } from "@/consts";
import { BlogNodeInterface } from "@/interfaces";
import ShimmerUIBlogPage from "@/components/shimmer-ui-blogPage";

export default function BlogsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogNodeInterface[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBlogs() {
      setLoading(true);
      try {
        const data = await Promise.allSettled(blogsList.map((name) => getBlogsList(name)));
        setBlogPosts(
          data.filter((item) => item.status === "fulfilled").flatMap((item) => item.value)
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadBlogs();
  }, []);

  const filteredPosts = useMemo(() => {
    return blogPosts?.filter((post) => {
      const matchesSearch =
        searchQuery === "" ||
        post.node.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.node.brief.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => post.node.tags?.some((t) => t.name === tag));

      return matchesSearch && matchesTags;
    });
  }, [searchQuery, selectedTags, blogPosts]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-background/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-6 animate-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-primary to-accent inline-block">
              Blog Posts
            </h1>
            <div className="h-1.5 w-20 bg-primary rounded-full my-2"></div>
            <p className="text-muted-foreground text-lg">My insights on various topics.</p>
          </div>

          {/* Search Bar */}
          <div
            className="mb-6 animate-in slide-in-from-bottom-6 duration-700"
            style={{ animationDelay: "100ms", animationFillMode: "both" }}
          >
            <div className="relative group">
              <Search className="absolute left-4 top-3.5 size-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                type="text"
                placeholder="Search by title or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 text-base bg-card/40 backdrop-blur-md border-border/50 rounded-2xl focus-visible:ring-primary/50 focus-visible:border-primary/50 transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Tag Filters */}
          <div
            className="mb-12 animate-in slide-in-from-bottom-6 duration-700"
            style={{ animationDelay: "200ms", animationFillMode: "both" }}
          >
            <p className="text-sm font-bold text-foreground/80 mb-4 uppercase tracking-wider">
              Filter by tags
            </p>
            <div className="flex flex-wrap gap-2.5">
              {tagsList.map(({ name }) => (
                <button
                  key={name}
                  onClick={() => toggleTag(name)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 border ${
                    selectedTags.includes(name)
                      ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20 scale-105"
                      : "bg-card/40 text-muted-foreground border-border/50 hover:bg-primary/10 hover:text-primary hover:border-primary/30"
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Posts Grid */}
          {loading ? (
            <ShimmerUIBlogPage />
          ) : (
            <div className="space-y-6">
              {(filteredPosts ? filteredPosts.length : 0) > 0 ? (
                filteredPosts?.map((post, index) => (
                  <Link
                    key={post.node.id}
                    href={`/blogs/${post.node.publication.domainInfo.hashnodeSubdomain}/${post.node.slug}`}
                    className="group block rounded-2xl border border-border/50 bg-card/20 backdrop-blur-md p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/50 animate-in slide-in-from-bottom-6"
                    style={{ animationDelay: `${(index % 5) * 100}ms`, animationFillMode: "both" }}
                  >
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">
                            {post?.node.title}
                          </h2>
                          <p className="text-base text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                            {post.node.brief}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {post.node.tags.map(({ name }) => (
                          <span
                            key={name}
                            className="inline-flex items-center bg-secondary/80 text-secondary-foreground text-xs font-medium px-2.5 py-1 rounded-md"
                          >
                            {name}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-sm text-muted-foreground/80 font-medium pt-4 border-t border-border/30">
                        <span>
                          {new Date(post.node.publishedAt).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
                          {post.node.readTimeInMinutes} min read
                        </span>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center py-16 rounded-2xl border border-dashed border-border/60 bg-card/10">
                  <p className="text-lg text-muted-foreground font-medium">No posts found.</p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedTags([]);
                    }}
                    className="mt-4 text-primary hover:underline font-medium"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
