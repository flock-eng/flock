'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import type { Post, MiniProfile } from '@/lib/api';
import PostComponent from '@/components/PostComponent';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const { username } = useParams() as { username: string };
  const [userDetails, setUserDetails] = useState<MiniProfile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await api.profilePage.getProfilePage({
          profile: { id: username }
        });
        setUserDetails(response.userDetails ?? null);
        setPosts(response.posts ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [username]);

  if (loading) {
    return <div className="p-4 text-center">Loading profile...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  if (!userDetails) {
    return <div className="p-4 text-center">Profile not found.</div>;
  }

  return (
    <div>
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-4 p-4 border-b">
          <Link href="/" className="hover:bg-gray-100 p-2 rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="font-semibold text-xl">
              {userDetails.firstName} {userDetails.lastName}
            </h1>
            <p className="text-gray-500 text-sm">
              {posts.length} {posts.length === 1 ? 'Post' : 'Posts'}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 border-b">
        <div
          className="w-24 h-24 rounded-full mb-4"
          style={{
            backgroundColor: userDetails.profilePicture?.pictureType.case === 'hexColor'
              ? userDetails.profilePicture.pictureType.value
              : '#ccc'
          }}
        />
        <h2 className="text-xl font-semibold">
          {userDetails.firstName} {userDetails.lastName}
        </h2>
        <p className="text-gray-500">@{userDetails.username}</p>
      </div>

      <div className="border-b px-4 py-3">
        <div className="text-sm font-semibold text-gray-500">Posts</div>
      </div>

      {posts.length === 0 ? (
        <div className="p-4 text-center text-gray-500">No posts yet.</div>
      ) : (
        posts.map((post) => (
          <PostComponent key={post.id?.id} post={post} />
        ))
      )}
    </div>
  );
} 