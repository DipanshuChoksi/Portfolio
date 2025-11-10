'use client'

import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'

import { cn } from '@/lib/utils'

/**
 * Renders a styled avatar root element and forwards all received props to the underlying Radix Avatar primitive.
 *
 * @param className - Optional additional class names merged with the component's default avatar styles
 * @returns The Avatar root React element with data-slot="avatar"
 */
function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        'relative flex size-8 shrink-0 overflow-hidden rounded-full',
        className,
      )}
      {...props}
    />
  )
}

/**
 * Displays an avatar image element with predefined styling and a `data-slot="avatar-image"` attribute.
 *
 * @param className - Additional CSS class names to merge with the component's default image styles
 * @returns The Avatar image element with composed `className`, `data-slot="avatar-image"`, and any forwarded props
 */
function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn('aspect-square size-full', className)}
      {...props}
    />
  )
}

/**
 * Renders a styled avatar fallback element displayed when an avatar image is unavailable.
 *
 * @param className - Additional CSS classes to merge with the component's default styling
 * @returns A React element for the avatar fallback with default styling and `data-slot="avatar-fallback"`
 */
function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        'bg-muted flex size-full items-center justify-center rounded-full',
        className,
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }