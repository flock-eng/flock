"use client";

import { Input } from "@/components/ui/input";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-center px-4">
        <div className="w-[65%] flex justify-center">
          <Input
            type="search"
            placeholder="Search Flock"
            className="w-full bg-muted/50"
          />
        </div>
      </div>
    </header>
  );
}
