import { Loader2Icon } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Renders a spinning loading icon with built-in accessibility attributes.
 *
 * @param className - Additional CSS classes to merge with the default "size-4 animate-spin"
 * @param props - Additional SVG props forwarded to the underlying icon
 * @returns A Loader2Icon SVG element with role="status", aria-label="Loading", default spin/size classes combined with `className`, and any forwarded SVG props
 */
function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
}

export { Spinner };