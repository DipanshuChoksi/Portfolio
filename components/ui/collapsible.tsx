'use client'

import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'

/**
 * Wraps Radix's CollapsiblePrimitive.Root, forwarding all props and adding a data-slot attribute.
 *
 * @param props - Props forwarded to CollapsiblePrimitive.Root
 * @returns A React element rendering CollapsiblePrimitive.Root with the provided props and `data-slot="collapsible"`
 */
function Collapsible({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />
}

/**
 * Renders a Collapsible trigger wrapper that applies data-slot="collapsible-trigger".
 *
 * @param props - Props passed through to Radix's CollapsibleTrigger element.
 * @returns A React element for a collapsible trigger with `data-slot="collapsible-trigger"`.
 */
function CollapsibleTrigger({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      {...props}
    />
  )
}

/**
 * Wraps Radix UI's CollapsibleContent and forwards all props while adding a data-slot attribute.
 *
 * @returns A CollapsibleContent React element with all given props forwarded and `data-slot="collapsible-content"` applied.
 */
function CollapsibleContent({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      {...props}
    />
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }