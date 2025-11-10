/**
 * Renders a pulse-animated skeleton layout representing a blog page while content is loading.
 *
 * The layout includes placeholders for the title, description lines, tag chips, and metadata (date and read time).
 *
 * @returns A JSX element representing the blog page skeleton placeholder.
 */
function ShimmerUIBlogPage() {
  return (
    <div className="animate-pulse block rounded-lg border border-border p-6">
      <div className="space-y-3">
        {/* Title */}
        <div className="h-5 w-3/4 bg-muted rounded" />

        {/* Description */}
        <div className="h-4 w-full bg-muted rounded" />
        <div className="h-4 w-5/6 bg-muted rounded" />

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-2">
          <div className="h-6 w-14 bg-muted rounded" />
          <div className="h-6 w-20 bg-muted rounded" />
          <div className="h-6 w-12 bg-muted rounded" />
        </div>

        {/* Metadata (date + read time) */}
        <div className="flex items-center justify-between pt-2">
          <div className="h-4 w-20 bg-muted rounded" />
          <div className="h-4 w-16 bg-muted rounded" />
        </div>
      </div>
    </div>
  );
}

export default ShimmerUIBlogPage;