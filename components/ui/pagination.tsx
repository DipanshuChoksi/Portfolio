import * as React from 'react'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'

/**
 * Renders a centered navigation container for pagination.
 *
 * @returns A `nav` element with role="navigation", aria-label="pagination", `data-slot="pagination"`, and any provided className and props applied.
 */
function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
      {...props}
    />
  )
}

/**
 * Container element for pagination items.
 *
 * Renders a `<ul>` with default horizontal layout and spacing, merges any provided `className` and other props, and sets `data-slot="pagination-content"` for slot targeting.
 *
 * @returns The pagination content `<ul>` element
 */
function PaginationContent({
  className,
  ...props
}: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn('flex flex-row items-center gap-1', className)}
      {...props}
    />
  )
}

/**
 * Renders a list item used as a pagination item.
 *
 * Forwards all passed `li` props onto the rendered element and sets `data-slot="pagination-item"`.
 *
 * @returns A `<li>` element with `data-slot="pagination-item"` and the forwarded props
 */
function PaginationItem({ ...props }: React.ComponentProps<'li'>) {
  return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<React.ComponentProps<typeof Button>, 'size'> &
  React.ComponentProps<'a'>

/**
 * Renders an anchor styled as a pagination control and reflects its active state for accessibility.
 *
 * @param isActive - Whether this link represents the current page; when `true` the element receives `aria-current="page"` and `data-active`.
 * @param size - Button size variant to apply (defaults to `'icon'`).
 * @returns The anchor element representing the pagination link.
 */
function PaginationLink({
  className,
  isActive,
  size = 'icon',
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? 'page' : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? 'outline' : 'ghost',
          size,
        }),
        className,
      )}
      {...props}
    />
  )
}

/**
 * Renders a pagination control for navigating to the previous page, showing a left chevron and a responsive "Previous" label.
 *
 * @returns A configured pagination link element with an accessible label and previous-page semantics.
 */
function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn('gap-1 px-2.5 sm:pl-2.5', className)}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>
  )
}

/**
 * Renders a "Next" pagination control with a responsive "Next" label and right chevron.
 *
 * @param className - Additional CSS classes to merge with the component's default spacing classes.
 * @returns The pagination link element for navigating to the next page.
 */
function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn('gap-1 px-2.5 sm:pr-2.5', className)}
      {...props}
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRightIcon />
    </PaginationLink>
  )
}

/**
 * Renders a non-interactive pagination ellipsis indicator.
 *
 * The element is marked as hidden from assistive technology and visually displays a horizontal ellipsis icon while including screen-reader text "More pages".
 *
 * @returns A <span> element used as an ellipsis indicator containing a visual icon and hidden accessible text.
 */
function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn('flex size-9 items-center justify-center', className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}