"use client";

import * as React from "react"
import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HeartIcon, ChatBubbleBottomCenterTextIcon, ShareIcon } from "@heroicons/react/24/outline"
import { Post } from "@buf/wcygan_flock.bufbuild_es/backend/v1/post_pb"
import { createMockApiClient } from "@/lib/api/mock-client"

function formatPostTime(timestamp: bigint): string {
  const dateObj = new Date(Number(timestamp))
  return dateObj.toLocaleString()
}

export function Feed() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    console.log("Fetching posts...")
    createMockApiClient()
      .posts.listMostRecentPosts({ postLimit: 3 })
      .then((res) => {
        console.log("Posts fetched:", res.posts)
        setPosts(res.posts)
      })
      .catch((error) => {
        console.error("Error fetching posts:", error)
      })
  }, [])

  return (
    <div className="space-y-4">
      {/* Create Post Card */}
      <Card className="p-4">
        <div className="flex items-center space-x-2">
          <div className="h-10 w-10 rounded-full bg-muted" />
          <textarea
            className="w-full resize-none border-0 bg-transparent p-0 placeholder:text-muted-foreground focus:ring-0"
            placeholder="Share an update..."
            rows={2}
          />
        </div>
        <div className="mt-4 flex justify-end">
          <Button>Post</Button>
        </div>
      </Card>

      {/* Render actual posts from mock data */}
      {posts.map((post) => (
        <Card key={post.id?.id} className="flex p-4 items-start space-x-2">
          {/* User avatar */}
          <div className="h-10 w-10 rounded-full bg-muted" />
          {/* Main post content */}
          <div className="flex-1 space-y-2">
            {/* Username + Post time */}
            <div className="flex items-center justify-between">
              <span className="font-medium">{post.author?.username ?? "Unknown"}</span>
              <span className="text-xs text-muted-foreground">
                {formatPostTime(post.createdAt)}
              </span>
            </div>
            {/* The post's text content */}
            <p>{post.content}</p>
            {/* Post action buttons */}
            <div className="flex justify-around border-t pt-2 mt-2">
              <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                <ChatBubbleBottomCenterTextIcon className="h-5 w-5" />
                <span>Reply</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                <HeartIcon className="h-5 w-5" />
                <span>Like</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                <ShareIcon className="h-5 w-5" />
                <span>Share</span>
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
