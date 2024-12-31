import { useState, useEffect } from "react";
import { ApiClient } from "@/lib/api-client";
import { Post } from "@/types";

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    ApiClient.posts.list().then(setPosts);
  }, []);

  return posts;
}
