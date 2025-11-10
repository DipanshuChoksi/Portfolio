import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Compose class names and resolve Tailwind CSS conflicts.
 *
 * @param inputs - One or more values accepted by clsx (strings, objects, or arrays) representing class names
 * @returns A single class name string with duplicate and conflicting Tailwind classes merged
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}