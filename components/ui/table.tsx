'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * Renders a responsive table wrapped in a container that provides horizontal scrolling and base styling.
 *
 * @param className - Additional CSS classes merged with the component's base table classes.
 * @returns A table element (data-slot="table") inside a container div (data-slot="table-container") with combined class names and all other props forwarded.
 */
function Table({ className, ...props }: React.ComponentProps<'table'>) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn('w-full caption-bottom text-sm', className)}
        {...props}
      />
    </div>
  )
}

/**
 * Renders a table header section with default bottom-border styling for header rows.
 *
 * @param className - Additional class names to merge with the component's default styling
 * @returns The rendered `thead` element with header styling and any passed props
 */
function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
  return (
    <thead
      data-slot="table-header"
      className={cn('[&_tr]:border-b', className)}
      {...props}
    />
  )
}

/**
 * Renders a table body element with styling for row borders and a slot attribute.
 *
 * @returns The `tbody` element with `data-slot="table-body"`, classes that remove the bottom border on the last row, and any provided `className` and other props.
 */
function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
  return (
    <tbody
      data-slot="table-body"
      className={cn('[&_tr:last-child]:border-0', className)}
      {...props}
    />
  )
}

/**
 * Renders a table footer element with footer-specific styling and a data-slot for styling/hooks.
 *
 * The rendered element has a translucent background, a top border, bold font weight, a rule
 * to remove the bottom border from the last row, the attribute `data-slot="table-footer"`,
 * and forwards any provided props to the underlying `tfoot`.
 *
 * @returns The rendered `tfoot` element with footer styling and forwarded props.
 */
function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        'bg-muted/50 border-t font-medium [&>tr]:last:border-b-0',
        className,
      )}
      {...props}
    />
  )
}

/**
 * Renders a stylized table row element.
 *
 * Applies row-specific styling (hover, selected state, border, and transition) and forwards all props to the underlying `tr`.
 *
 * @returns A `tr` element with `data-slot="table-row"` and the provided `className` merged with the component's base classes.
 */
function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        'hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors',
        className,
      )}
      {...props}
    />
  )
}

/**
 * Renders a table header cell with consistent header typography, alignment, and checkbox-aware spacing.
 *
 * @param className - Additional CSS classes to merge with the component's base styles
 * @returns The rendered table header cell element
 */
function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        'text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        className,
      )}
      {...props}
    />
  )
}

/**
 * Renders a styled table cell (`td`) with a data-slot for slot-based styling/hooks.
 *
 * The rendered cell includes default padding, vertical alignment, and whitespace handling,
 * and merges any provided `className`. It also applies special layout rules when the cell
 * contains an element with `role="checkbox"`.
 *
 * @returns The table cell element configured for the table UI system.
 */
function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        'p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        className,
      )}
      {...props}
    />
  )
}

/**
 * Renders a table caption with the component's default caption styles.
 *
 * @param className - Additional class names to merge with the component's default caption classes
 * @returns A `caption` element with default styling, merged `className`, and any other provided props applied
 */
function TableCaption({
  className,
  ...props
}: React.ComponentProps<'caption'>) {
  return (
    <caption
      data-slot="table-caption"
      className={cn('text-muted-foreground mt-4 text-sm', className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}