'use client'

import * as React from 'react'
import * as HoverCardPrimitive from '@radix-ui/react-hover-card'

import { cn } from '@/lib/utils'

/**
 * Wraps the Radix HoverCard Root, adding a `data-slot="hover-card"` attribute and forwarding all props.
 *
 * @param props - Props forwarded to the underlying Radix HoverCard.Root
 * @returns The Radix HoverCard Root element with `data-slot="hover-card"` and the provided props applied
 */
function HoverCard({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Root>) {
  return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />
}

/**
 * Renders a hover card trigger element with a data-slot of "hover-card-trigger" and forwards all received props.
 *
 * @param props - Props forwarded to the trigger element
 * @returns The hover card trigger element
 */
function HoverCardTrigger({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Trigger>) {
  return (
    <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
  )
}

/**
 * Renders the hover card content inside a portal with built-in styling and configurable alignment/offset.
 *
 * @param className - Additional CSS class names to merge with the component's default styles.
 * @param align - Content alignment relative to the trigger (default: "center").
 * @param sideOffset - Distance in pixels to offset the content from the trigger (default: 4).
 * @returns The rendered Hover Card content element wrapped in a portal.
 */
function HoverCardContent({
  className,
  align = 'center',
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Content>) {
  return (
    <HoverCardPrimitive.Portal data-slot="hover-card-portal">
      <HoverCardPrimitive.Content
        data-slot="hover-card-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-64 origin-(--radix-hover-card-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden',
          className,
        )}
        {...props}
      />
    </HoverCardPrimitive.Portal>
  )
}

export { HoverCard, HoverCardTrigger, HoverCardContent }