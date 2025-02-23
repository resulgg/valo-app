import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateUniqueId(): string {
  const timestamp = Date.now().toString(36);
  const randomStr = crypto
    .getRandomValues(new Uint8Array(4))
    .reduce((acc, val) => acc + val.toString(36), "");
  return `${timestamp}-${randomStr}`;
}
