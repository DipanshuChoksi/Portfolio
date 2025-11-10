import { cn } from '@/lib/utils'

/**
 * Render a styled div that serves as a loading skeleton placeholder.
 *
 * Combines default skeleton classes with any provided `className` and forwards remaining props to the underlying div.
 *
 * @param className - Additional CSS class names appended to the default skeleton styles
 * @returns A div element that acts as a skeleton/loading placeholder
 */
function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn('bg-accent animate-pulse rounded-md', className)}
      {...props}
    />
  )
}

export { Skeleton }