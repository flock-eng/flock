'use client';

import Link from 'next/link';
import type { Post } from '@/lib/api';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { Avatar } from './ui/Avatar';
import { Button } from './ui/Button';
import { Card, CardContent, CardFooter } from './ui/Card';
import { cn } from '@/lib/utils';

interface Props {
  post: Post;
  className?: string;
}

export default function PostComponent({ post, className }: Props) {
  return (
    <Card className={cn('border-x-0 rounded-none shadow-none', className)}>
      <CardContent className="p-4">
        <div className="flex gap-3">
          <Link href={`/profile/${post.author?.username}`}>
            <Avatar
              hexColor={
                post.author?.profilePicture?.pictureType.case === 'hexColor'
                  ? post.author.profilePicture.pictureType.value
                  : undefined
              }
              alt={`${post.author?.firstName} ${post.author?.lastName}`}
            />
          </Link>

          <div className="flex-grow">
            <div className="flex items-center gap-1">
              <Link
                href={`/profile/${post.author?.username}`}
                className="font-semibold hover:underline"
              >
                {post.author?.firstName} {post.author?.lastName}
              </Link>
              <span className="text-gray-500">·</span>
              <Link
                href={`/profile/${post.author?.username}`}
                className="text-gray-500 hover:underline"
              >
                @{post.author?.username}
              </Link>
              <span className="text-gray-500">·</span>
              <time className="text-gray-500">
                {new Date(Number(post.createdAt)).toLocaleDateString()}
              </time>
            </div>

            <p className="mt-2 whitespace-pre-wrap">{post.content}</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-4 py-2 border-t">
        <div className="flex gap-6 w-full">
          <Button variant="ghost" size="sm" className="gap-2">
            <Heart className="w-5 h-5" />
            <span>0</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <MessageCircle className="w-5 h-5" />
            <span>0</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <Share2 className="w-5 h-5" />
            <span>0</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}