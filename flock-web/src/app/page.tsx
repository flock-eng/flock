'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import type { Post } from '@/lib/api';
import PostComponent from '@/components/PostComponent';
import CreatePostForm from '@/components/CreatePostForm';
import { Card } from '@/components/ui/Card';
import { Loader2 } from 'lucide-react';

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
        <div className="px-4 py-3">
          <h1 className="text-xl font-semibold">Home</h1>
        </div>
      </div>

      <CreatePostForm onSuccess={fetchPosts} />

      {loading ? (
        <div className="flex justify-center items-center p-8">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      ) : error ? (
        <Card className="m-4 p-4 text-center text-red-500 bg-red-50 border-red-100">
          {error}
        </Card>
      ) : posts.length === 0 ? (
        <Card className="m-4 p-4 text-center text-gray-500 bg-gray-50">
          No posts yet. Be the first to post!
        </Card>
      ) : (
        <div className="divide-y">
          {posts.map((post) => (
            <PostComponent key={post.id?.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
