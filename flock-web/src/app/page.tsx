'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import type { Post } from '@/lib/api';
import PostComponent from '@/components/PostComponent';
import CreatePostForm from '@/components/CreatePostForm';

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchPosts() {
    try {
      const response = await api.homePage.getHomePage({});
      setPosts(response.posts ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b">
        <h1 className="p-4 text-xl font-semibold">Home</h1>
      </div>

      <CreatePostForm onSuccess={fetchPosts} />

      {loading ? (
        <div className="p-4 text-center">Loading posts...</div>
      ) : error ? (
        <div className="p-4 text-center text-red-500">{error}</div>
      ) : posts.length === 0 ? (
        <div className="p-4 text-center text-gray-500">No posts yet.</div>
      ) : (
        posts.map((post) => (
          <PostComponent key={post.id?.id} post={post} />
        ))
      )}
    </div>
  );
}
