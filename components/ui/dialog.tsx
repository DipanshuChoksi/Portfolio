"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Renders a dialog root element that applies data-slot="dialog" and forwards all received props.
 *
 * @param props - Props to pass through to Radix UI's Dialog.Root
 * @returns The rendered Dialog.Root element with the `data-slot="dialog"` attribute
 */
function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

/**
 * Renders a Radix Dialog Trigger with a `data-slot="dialog-trigger"` attribute and forwards all props.
 *
 * @returns The trigger element for opening the dialog.
 */
function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

/**
 * Wraps Radix's Portal to render dialog content into a portal with a `data-slot="dialog-portal"` attribute.
 *
 * Forwards all received props to the underlying Radix Portal.
 *
 * @returns A Portal element that renders its children into a React portal and is marked with `data-slot="dialog-portal"`.
 */
function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

/**
 * Renders a dialog close trigger element with the `data-slot="dialog-close"` attribute.
 *
 * @returns A `DialogPrimitive.Close` element with `data-slot="dialog-close"` and all received props forwarded.
 */
function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

/**
 * Wrapper for Radix Overlay that provides the dialog overlay with default styling and forwards all props.
 *
 * @returns A React element rendering the dialog overlay with default classes merged with `className` and a `data-slot="dialog-overlay"` attribute.
 */
function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  );
}

/**
 * Composes a dialog Portal, Overlay, and Content element with built-in styling and an optional close control.
 *
 * @param showCloseButton - When `true`, renders a close button inside the content (defaults to `true`).
 * @returns The dialog content element (Portal → Overlay → Content) with applied classes and optional close button.
 */
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean;
}) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

/**
 * Styled container for a dialog's header area.
 *
 * @param className - Additional CSS class names to merge with the component's default header styles
 * @returns A `div` element with header layout and typography classes and `data-slot="dialog-header"`
 */
function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  );
}

/**
 * Styled container for a dialog's footer that arranges action elements responsively.
 *
 * Renders a div with data-slot="dialog-footer" and responsive layout classes that stack buttons vertically on small screens and align them to the right on larger screens.
 *
 * @returns The rendered dialog footer element.
 */
function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  );
}

/**
 * Renders a dialog title element with default typography and a data-slot of "dialog-title".
 *
 * @returns The rendered title element with default typography classes; any provided `className` is merged.
 */
function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  );
}

/**
 * Styled wrapper for the dialog description that injects a data-slot and typography classes.
 *
 * @param className - Additional class names to merge with default description styles
 * @returns A DialogPrimitive.Description element with merged classes and all props forwarded
 */
function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};