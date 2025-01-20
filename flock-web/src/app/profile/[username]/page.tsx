'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import type { Post, MiniProfile } from '@/lib/api';
import PostComponent from '@/components/PostComponent';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Avatar } from '@/components/ui/Avatar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

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
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="m-4 p-4 text-center text-red-500 bg-red-50 border-red-100">
        {error}
      </Card>
    );
  }

  if (!userDetails) {
    return (
      <Card className="m-4 p-4 text-center text-gray-500 bg-gray-50">
        Profile not found.
      </Card>
    );
  }

  return (
    <div>
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-4 p-4 border-b">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
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

      <div className="relative">
        <div className="h-32 bg-gray-200" />
        <div className="px-4 pb-4 pt-16 border-b relative">
          <div className="absolute -top-12 left-4">
            <Avatar
              size="lg"
              hexColor={
                userDetails.profilePicture?.pictureType.case === 'hexColor'
                  ? userDetails.profilePicture.pictureType.value
                  : undefined
              }
              alt={`${userDetails.firstName} ${userDetails.lastName}`}
            />
          </div>

          <div className="flex justify-end mb-4">
            <Button variant="secondary">Edit Profile</Button>
          </div>

          <h2 className="text-xl font-semibold">
            {userDetails.firstName} {userDetails.lastName}
          </h2>
          <p className="text-gray-500">@{userDetails.username}</p>
        </div>
      </div>

      <div className="border-b px-4 py-3">
        <div className="text-sm font-semibold text-gray-500">Posts</div>
      </div>

      {posts.length === 0 ? (
        <Card className="m-4 p-4 text-center text-gray-500 bg-gray-50">
          No posts yet.
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