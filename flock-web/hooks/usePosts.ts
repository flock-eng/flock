import { useState, useEffect } from "react";
import { ApiClient } from "@/lib/api-client";
import { Post } from "@buf/wcygan_flock.bufbuild_es/backend/v1/post_pb";

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    ApiClient.posts.listMostRecentPosts({ postLimit: 10 }).then((response) => {
      setPosts(response.posts);
    });
  }, []);

  return posts;
}
