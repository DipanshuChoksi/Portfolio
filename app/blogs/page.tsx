"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getBlogsList } from "./getBlogsList";
import { blogsList, tagsList } from "@/consts";
import { BlogNode } from "@/interfaces";

export default function BlogsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredPosts, setBlogPosts] = useState<BlogNode[]>();

  useEffect(() => {
    Promise.all(blogsList.map((name) => getBlogsList(name)))
      .then((data) => setBlogPosts(data.flat()))
      .catch(console.error);
  }, [blogsList]);

  // const filteredPosts = useMemo(() => {
  //   return blogPosts?.filter((post) => {
  //     const matchesSearch =
  //       searchQuery === "" ||
  //       post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       post.brief.toLowerCase().includes(searchQuery.toLowerCase());

  //     const matchesTags =
  //       selectedTags.length === 0 ||
  //       selectedTags.some((tag) => post?.tags?.includes({ name: "" }));

  //     return matchesSearch && matchesTags;
  //   });
  // }, [searchQuery, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-balance text-3xl font-bold mb-2">Blog Posts</h1>
            <p className="text-muted-foreground">
              Insights and tutorials on web development
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-3 size-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by title or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Tag Filters */}
          <div className="mb-8">
            <p className="text-sm font-medium text-foreground mb-3">
              Filter by tags:
            </p>
            <div className="flex flex-wrap gap-2">
              {tagsList.map(({ name }) => (
                <button
                  key={name}
                  onClick={() => toggleTag(name)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedTags.includes(name)
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="space-y-6">
            {(filteredPosts ? filteredPosts.length : 0) > 0 ? (
              filteredPosts?.map((post, ind) => (
                <Link
                  key={ind}
                  href={`/blogs/${post.node.publication.domainInfo.hashnodeSubdomain}/${post.node.slug}`}
                  className="group block rounded-lg border border-border p-6 transition-all hover:border-primary hover:shadow-lg"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                          {post?.node.title}
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1">
                          {post.node.brief}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {tagsList.map(({ name }) => (
                        <span
                          key={name}
                          className="inline-block bg-secondary/50 text-secondary-foreground text-xs px-2 py-1 rounded"
                        >
                          {name}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>
                        {new Date(post.node.publishedAt).toLocaleDateString()}
                      </span>
                      <span>{post.node.readTimeInMinutes} min read</span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground">
                  No posts found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
