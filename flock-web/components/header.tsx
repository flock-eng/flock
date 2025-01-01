"use client";

import { Input } from "@/components/ui/input";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const query = e.currentTarget.value.trim();
      if (query) {
        router.push(`/discover/${encodeURIComponent(query)}`);
      }
    }
  };

  // Clear search input on route change
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.value = '';
    }
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-center px-4">
        <div className="w-[65%] flex justify-center">
          <Input
            ref={searchInputRef}
            type="search"
            placeholder="Search Flock"
            className="w-full bg-muted/50"
            onKeyDown={handleSearch}
          />
        </div>
      </div>
    </header>
  );
}
