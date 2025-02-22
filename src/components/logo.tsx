"use client";

import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <h1 className="text-2xl font-medium tracking-tight">
        <span className="text-muted-foreground">Kaliteye Hoşgeldiniz ✨</span>
      </h1>
    </Link>
  );
}
