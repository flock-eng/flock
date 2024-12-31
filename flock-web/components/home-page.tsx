"use client";

import { Input } from "@/components/ui/input";
import { usePosts } from "@/hooks/usePosts";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

export function HomePage() {
  const posts = usePosts();

  return (
    <div className="flex-1 flex gap-4 p-4">
      <main className="flex-1 max-w-2xl mx-auto">
        <div className="mb-4">
          <Input
            type="search"
            placeholder="Search Flock"
            className="w-full bg-muted/50"
          />
        </div>
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id!.id} className="p-4">
              <div className="flex gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback 
                    style={{ backgroundColor: getColorFromUsername(post.author!.username) }}
                    className="text-white"
                  >
                    {post.author!.firstName[0]}{post.author!.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">
                      {post.author!.firstName} {post.author!.lastName}
                    </h3>
                    <span className="text-muted-foreground text-sm">
                      @{post.author!.username}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      · {new Date(Number(post.createdAt)).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                    </span>
                  </div>
                  <p className="mt-1 text-sm">{post.content}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>

      <aside className="hidden lg:block w-[350px] shrink-0">
        <div className="sticky top-4 space-y-4">
          <Card>
            <h2 className="font-semibold mb-4">Advertisement</h2>
            <div className="bg-primary/5 p-4 rounded-lg text-center space-y-2">
              <h3 className="font-semibold text-lg">Buy Bitcoin for 5% off!</h3>
              <p className="text-sm text-muted-foreground">Limited time offer. Get started today!</p>
              <Button className="w-full">
                Learn More
              </Button>
            </div>
          </Card>

          <Card>
            <h2 className="font-semibold mb-4">Who to follow</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback 
                        style={{ backgroundColor: getColorFromUsername("username") }}
                        className="text-white"
                      />
                    </Avatar>
                    <div className="text-sm">
                      <div className="font-medium">User Name</div>
                      <div className="text-muted-foreground">@username</div>
                    </div>
                  </div>
                  <Button variant="secondary" size="sm">Follow</Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </aside>
    </div>
  );
}
