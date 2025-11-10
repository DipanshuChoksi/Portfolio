import { cn } from '@/lib/utils'

/**
 * Renders a styled keyboard key (<kbd>) element with standardized classes and optional additional classes.
 *
 * @param className - Additional class names to merge with the component's default classes
 * @returns The rendered `<kbd>` element with composed classes and `data-slot="kbd"`
 */
function Kbd({ className, ...props }: React.ComponentProps<'kbd'>) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        'bg-muted w-fit text-muted-foreground pointer-events-none inline-flex h-5 min-w-5 items-center justify-center gap-1 rounded-sm px-1 font-sans text-xs font-medium select-none',
        "[&_svg:not([class*='size-'])]:size-3",
        '[[data-slot=tooltip-content]_&]:bg-background/20 [[data-slot=tooltip-content]_&]:text-background dark:[[data-slot=tooltip-content]_&]:bg-background/10',
        className,
      )}
      {...props}
    />
  )
}

/**
 * Renders a container for grouped keyboard key elements.
 *
 * @param className - Additional CSS class names merged with the component's default layout classes
 * @param props - Other HTML attributes and event handlers forwarded to the underlying `<kbd>` element
 * @returns A `<kbd>` element with `data-slot="kbd-group"` and merged classes that visually groups keyboard keys
 */
function KbdGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <kbd
      data-slot="kbd-group"
      className={cn('inline-flex items-center gap-1', className)}
      {...props}
    />
  )
}

export { Kbd, KbdGroup }