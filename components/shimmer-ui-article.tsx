/**
 * Render a skeleton (shimmer) placeholder layout for an article page.
 *
 * Renders a static set of placeholder elements (back button, cover image, title, metadata, tags, and content blocks)
 * styled for a pulsing loading state.
 *
 * @returns A JSX element representing the article page shimmer UI
 */
function ShimmerUIArticlePage() {
  return (
    <main className="flex-1">
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 animate-pulse">
        {/* Back Button */}
        <div className="w-32 h-8 bg-muted rounded mb-8" />

        {/* Cover Image */}
        <div className="w-full h-96 bg-muted rounded-lg mb-8" />

        {/* Title */}
        <div className="h-10 w-3/4 bg-muted rounded mb-4" />

        {/* Metadata */}
        <div className="flex gap-4 mb-6">
          <div className="h-4 w-32 bg-muted rounded" />
          <div className="h-4 w-24 bg-muted rounded" />
        </div>

        {/* Tags */}
        <div className="flex gap-2 mb-8">
          <div className="h-6 w-14 bg-muted rounded" />
          <div className="h-6 w-16 bg-muted rounded" />
          <div className="h-6 w-12 bg-muted rounded" />
        </div>

        {/* Content Blocks */}
        <div className="space-y-4">
          <div className="h-4 w-full bg-muted rounded" />
          <div className="h-4 w-full bg-muted rounded" />
          <div className="h-4 w-2/3 bg-muted rounded" />
          <div className="h-4 w-full bg-muted rounded" />
          <div className="h-4 w-3/4 bg-muted rounded" />
        </div>
      </article>
    </main>
  );
}

export default ShimmerUIArticlePage;