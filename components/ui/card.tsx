import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * Card container that applies base card styles and merges any provided `className`.
 *
 * @returns A div element used as the card container with base styling, the merged `className`, and all forwarded props.
 */
function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card"
      className={cn(
        'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm',
        className,
      )}
      {...props}
    />
  )
}

/**
 * Renders the header area of a Card, exposing a slot target for header content.
 *
 * Renders a div with data-slot="card-header" and base grid/layout classes; additional classes
 * passed via `className` are appended to the element's class list.
 *
 * @param className - Extra CSS classes to add to the header element
 * @returns The rendered Card header element
 */
function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
        className,
      )}
      {...props}
    />
  )
}

/**
 * Renders the card's title slot with title typography and spacing.
 *
 * @returns A div element with data-slot="card-title" and title-specific classes (`leading-none font-semibold`) merged with any provided `className`.
 */
function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn('leading-none font-semibold', className)}
      {...props}
    />
  )
}

/**
 * Renders the card's description area with muted, small text styling.
 *
 * @returns A div element with data-slot="card-description" that applies muted foreground and small-text styles and forwards any received props.
 */
function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

/**
 * Renders the card action slot used to position an action element (e.g., buttons) inside a Card.
 *
 * @param className - Additional CSS classes merged with the component's default positioning classes
 * @param props - Other standard div props forwarded to the underlying element
 * @returns A div element with `data-slot="card-action"` that places its children in the card's action area
 */
function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className,
      )}
      {...props}
    />
  )
}

/**
 * Renders the card's content container with horizontal padding.
 *
 * @returns A React element representing the card content container with horizontal padding and any provided classes merged into its `className`.
 */
function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-content"
      className={cn('px-6', className)}
      {...props}
    />
  )
}

/**
 * Renders the card footer container.
 *
 * The element is intended to host footer content (actions, metadata) and applies footer-specific layout and spacing.
 *
 * @returns A div element used as the card footer with layout and padding appropriate for footer content.
 */
function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center px-6 [.border-t]:pt-6', className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}