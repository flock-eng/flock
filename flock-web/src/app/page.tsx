'use client';

import { signOut } from "next-auth/react";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      // Update the signOut call to use the correct configuration
      await signOut({
        callbackUrl: '/login',
        redirect: true
      });
    } catch (error) {
      console.error('Sign out error:', error);
      setIsLoading(false); // Reset loading state on error
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 gap-8">
      <h1 className="text-4xl font-bold">Hello World</h1>
      <Button
        onClick={handleSignOut}
        size="lg"
        disabled={isLoading}
      >
        Sign Out
        {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
      </Button>
    </div>
  );
}