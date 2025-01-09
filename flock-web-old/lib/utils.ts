import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getColorFromUsername(username: string): string {
  // Take first 6 characters of the username hash
  const hash = username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const hex = (hash & 0xFFFFFF).toString(16).padStart(6, '0');
  return `#${hex}`;
}
