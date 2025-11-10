'use client'

import * as React from 'react'
import * as SeparatorPrimitive from '@radix-ui/react-separator'

import { cn } from '@/lib/utils'

/**
 * Render a styled separator element with configurable orientation and decorative state.
 *
 * @param className - Optional additional class name(s) to apply to the separator
 * @param orientation - Orientation of the separator, either `"horizontal"` or `"vertical"`; defaults to `"horizontal"`
 * @param decorative - If `true`, mark the separator as decorative for assistive technologies; defaults to `true`
 * @returns A React element representing the styled separator
 */
function Separator({
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        'bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
        className,
      )}
      {...props}
    />
  )
}

export { Separator }