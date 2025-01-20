'use client';

import Link from 'next/link';
import type { Post } from '@/lib/api';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { Avatar } from './ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter } from './ui/Card';
import { cn } from '@/lib/utils';

interface Props {
  post: Post;
  className?: string;
}

export default function PostComponent({ post, className }: Props) {
  return (
    <Card className={cn('border-x-0 rounded-none shadow-none hover:bg-surface-hover hover-transition', className)}>
      <CardContent className="p-6">
        <div className="flex gap-4">
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
            <div className="flex items-center gap-2">
              <Link
                href={`/profile/${post.author?.username}`}
                className="font-semibold text-text-primary hover:text-primary hover-transition"
              >
                {post.author?.firstName} {post.author?.lastName}
              </Link>
              <span className="text-text-muted">·</span>
              <Link
                href={`/profile/${post.author?.username}`}
                className="text-text-tertiary hover:text-primary hover-transition"
              >
                @{post.author?.username}
              </Link>
              <span className="text-text-muted">·</span>
              <time className="text-text-tertiary">
                {new Date(Number(post.createdAt)).toLocaleDateString()}
              </time>
            </div>

            <p className="mt-3 text-text-secondary whitespace-pre-wrap leading-relaxed">{post.content}</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-6 py-3 border-t border-surface-secondary">
        <div className="flex gap-8 w-full">
          <Button variant="ghost" size="sm" className="gap-2 text-text-tertiary hover:text-primary hover:bg-surface-secondary">
            <Heart className="w-5 h-5" />
            <span>0</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-2 text-text-tertiary hover:text-primary hover:bg-surface-secondary">
            <MessageCircle className="w-5 h-5" />
            <span>0</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-2 text-text-tertiary hover:text-primary hover:bg-surface-secondary">
            <Share2 className="w-5 h-5" />
            <span>0</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}