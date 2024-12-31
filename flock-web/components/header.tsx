"use client";

import { Input } from "@/components/ui/input";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center gap-4 px-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search Flock"
            className="w-full max-w-[400px] bg-muted/50"
          />
        </div>
      </div>
    </header>
  );
}
