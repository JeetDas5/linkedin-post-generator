import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Removes all asterisks from a string (for AI response sanitization)
export function sanitizeResponse(text: string): string {
  return text.replace(/\*/g, "");
}
