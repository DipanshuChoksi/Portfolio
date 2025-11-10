'use client'

import * as React from 'react'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

/**
 * Wraps Radix's AlertDialog.Root and renders it with a standardized `data-slot` attribute.
 *
 * @param props - All props are forwarded to `AlertDialogPrimitive.Root`
 * @returns A React element rendering `AlertDialogPrimitive.Root` with `data-slot="alert-dialog"` and the provided props
 */
function AlertDialog({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
}

/**
 * Renders an AlertDialog trigger element with a standardized `data-slot` and forwards all props.
 *
 * @returns An AlertDialog trigger element with the `data-slot="alert-dialog-trigger"` attribute and any provided props applied.
 */
function AlertDialogTrigger({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  )
}

/**
 * Renders a Radix AlertDialog Portal with a data-slot and forwards all received props.
 *
 * @returns The rendered AlertDialog portal element.
 */
function AlertDialogPortal({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  )
}

/**
 * Renders the alert dialog overlay with standardized backdrop, positioning, and open/close animations.
 *
 * @param className - Additional CSS class names merged with the component's default classes.
 * @returns The alert dialog overlay element.
 */
function AlertDialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      className={cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
        className,
      )}
      {...props}
    />
  )
}

/**
 * Renders the alert dialog content inside a Portal with an overlay and a set of default layout, positioning, and animation styles.
 *
 * @param className - Additional CSS class names to merge with the component's default styles
 * @returns The composed AlertDialog content element
 */
function AlertDialogContent({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Content>) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        className={cn(
          'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg',
          className,
        )}
        {...props}
      />
    </AlertDialogPortal>
  )
}

/**
 * Renders the alert dialog header container with standardized layout and a data-slot attribute.
 *
 * @param className - Additional CSS class names appended to the default header styles
 * @param props - Additional `div` props that are forwarded to the rendered element
 * @returns A `div` element used as the alert dialog header
 */
function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
      {...props}
    />
  )
}

/**
 * Renders the footer area for an alert dialog, arranging action elements responsively.
 *
 * @returns A div element used as the alert dialog footer; on small screens actions stack vertically (reversed order) and on larger screens actions are laid out horizontally and aligned to the end.
 */
function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
        className,
      )}
      {...props}
    />
  )
}

/**
 * Renders the alert dialog title element with standardized typography and a data-slot.
 *
 * @param className - Additional CSS class names to merge with the component's default title styles
 * @returns A Title element for the alert dialog with default large, bold typography and all other props forwarded
 */
function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn('text-lg font-semibold', className)}
      {...props}
    />
  )
}

/**
 * Renders the styled description slot for an alert dialog.
 *
 * @param className - Additional CSS classes to apply to the description element
 * @returns The alert dialog description element
 */
function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

/**
 * Renders a styled confirm/action button for an alert dialog.
 *
 * @param className - Additional CSS class names to apply to the action button
 * @returns The rendered AlertDialog action element with unified button styling
 */
function AlertDialogAction({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action>) {
  return (
    <AlertDialogPrimitive.Action
      className={cn(buttonVariants(), className)}
      {...props}
    />
  )
}

/**
 * Renders an AlertDialog cancel button styled with the outline button variant.
 *
 * @param className - Additional CSS class names to merge with the outline button styling
 * @returns The rendered AlertDialogPrimitive.Cancel element configured as an outlined button
 */
function AlertDialogCancel({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel>) {
  return (
    <AlertDialogPrimitive.Cancel
      className={cn(buttonVariants({ variant: 'outline' }), className)}
      {...props}
    />
  )
}

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}