import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { ChevronRight, MoreHorizontal } from 'lucide-react'

import { cn } from '@/lib/utils'

/**
 * Renders a breadcrumb navigation container.
 *
 * The component produces a <nav> element with aria-label="breadcrumb" and data-slot="breadcrumb",
 * and forwards all provided props to the underlying <nav>.
 *
 * @param props - Props to apply to the rendered <nav> element
 * @returns A <nav> element used as the breadcrumb container
 */
function Breadcrumb({ ...props }: React.ComponentProps<'nav'>) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />
}

/**
 * Render an ordered list container used to hold breadcrumb items.
 *
 * The element is marked with `data-slot="breadcrumb-list"` and includes default styling for spacing and text; any `className` provided is merged with the defaults and other props are forwarded to the `<ol>`.
 *
 * @returns An ordered list element configured as the breadcrumb list with default styling and any provided `className` applied
 */
function BreadcrumbList({ className, ...props }: React.ComponentProps<'ol'>) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        'text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5',
        className,
      )}
      {...props}
    />
  )
}

/**
 * Render a breadcrumb list item with the breadcrumb-item data-slot and default layout classes.
 *
 * @param className - Additional class names to merge with the default inline-flex, items-center, and gap classes
 * @returns An `<li>` element configured as a breadcrumb item
 */
function BreadcrumbItem({ className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn('inline-flex items-center gap-1.5', className)}
      {...props}
    />
  )
}

/**
 * Renders a breadcrumb link element with breadcrumb-specific attributes and styling.
 *
 * @param asChild - If `true`, render the provided child component slot instead of an anchor.
 * @param className - Additional class names to merge with the component's default hover and transition styles.
 * @param props - Additional props to forward to the rendered element.
 * @returns The rendered link element with `data-slot="breadcrumb-link"` and merged class names.
 */
function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<'a'> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : 'a'

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn('hover:text-foreground transition-colors', className)}
      {...props}
    />
  )
}

/**
 * Renders a non-interactive page indicator for the current breadcrumb item.
 *
 * The element is a `<span>` with `role="link"`, `aria-current="page"`, and `aria-disabled="true"`.
 *
 * @returns The rendered `<span>` used to represent the current page in the breadcrumb
 */
function BreadcrumbPage({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn('text-foreground font-normal', className)}
      {...props}
    />
  )
}

/**
 * Render a breadcrumb separator list item.
 *
 * Renders an <li> with data-slot="breadcrumb-separator", role="presentation", and aria-hidden="true"; displays `children` if provided or a default chevron icon otherwise.
 *
 * @param children - Content rendered inside the separator; defaults to a ChevronRight icon when omitted
 * @param className - Additional class names applied to the <li>
 * @returns An <li> element used as a visual separator between breadcrumb items
 */
function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn('[&>svg]:size-3.5', className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  )
}

/**
 * Renders an ellipsis placeholder used to indicate truncated breadcrumb items.
 *
 * @returns A <span> element containing an ellipsis icon and a visually hidden "More" label.
 */
function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn('flex size-9 items-center justify-center', className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}