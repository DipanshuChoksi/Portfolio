import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

/**
 * Renders an empty-state container with standardized layout and styling.
 *
 * @returns A div element with `data-slot="empty"` that applies the component's default layout and spacing classes merged with any provided `className`.
 */
function Empty({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="empty"
      className={cn(
        'flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-lg border-dashed p-6 text-center text-balance md:p-12',
        className,
      )}
      {...props}
    />
  )
}

/**
 * Renders the header slot for an empty-state layout.
 *
 * @returns The header div element with `data-slot="empty-header"`.
 */
function EmptyHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="empty-header"
      className={cn(
        'flex max-w-sm flex-col items-center gap-2 text-center',
        className,
      )}
      {...props}
    />
  )
}

const emptyMediaVariants = cva(
  'flex shrink-0 items-center justify-center mb-2 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        icon: "bg-muted text-foreground flex size-10 shrink-0 items-center justify-center rounded-lg [&_svg:not([class*='size-'])]:size-6",
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

/**
 * Renders a styled container for empty-state media (icon or illustration).
 *
 * @param className - Additional CSS classes to apply to the container
 * @param variant - Visual variant to apply; `'default'` for transparent layout or `'icon'` for centered, rounded icon styling
 * @returns A <div> element with `data-slot="empty-icon"` and `data-variant` set to the chosen variant
 */
function EmptyMedia({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof emptyMediaVariants>) {
  return (
    <div
      data-slot="empty-icon"
      data-variant={variant}
      className={cn(emptyMediaVariants({ variant, className }))}
      {...props}
    />
  )
}

/**
 * Renders the title slot for an empty state.
 *
 * Renders a div with `data-slot="empty-title"` and merges `className` with default title styles.
 *
 * @param className - Additional CSS classes to apply to the title element
 * @returns The title element for an empty state
 */
function EmptyTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="empty-title"
      className={cn('text-lg font-medium tracking-tight', className)}
      {...props}
    />
  )
}

/**
 * Renders styled descriptive text for an empty state.
 *
 * Applies default typography and link styles, sets `data-slot="empty-description"`,
 * merges any provided `className`, and forwards remaining props to the element.
 *
 * @returns The element used to display the empty-state description.
 */
function EmptyDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <div
      data-slot="empty-description"
      className={cn(
        'text-muted-foreground [&>a:hover]:text-primary text-sm/relaxed [&>a]:underline [&>a]:underline-offset-4',
        className,
      )}
      {...props}
    />
  )
}

/**
 * Container for empty-state content that centers and stacks its children.
 *
 * @returns The rendered div element used as the empty-state content container
 */
function EmptyContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="empty-content"
      className={cn(
        'flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm text-balance',
        className,
      )}
      {...props}
    />
  )
}

export {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
}