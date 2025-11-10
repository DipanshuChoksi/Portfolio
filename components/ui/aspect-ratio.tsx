'use client'

import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio'

/**
 * Renders a Radix UI AspectRatio root element with a `data-slot="aspect-ratio"` attribute.
 *
 * @param props - Props to forward to `AspectRatioPrimitive.Root`
 * @returns A React element: `AspectRatioPrimitive.Root` with `data-slot="aspect-ratio"` and the forwarded props
 */
function AspectRatio({
  ...props
}: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
  return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />
}

export { AspectRatio }