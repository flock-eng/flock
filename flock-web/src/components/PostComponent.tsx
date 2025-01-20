'use client';

import Link from 'next/link';
import type { Post } from '@/lib/api';
import { Heart, MessageCircle, Share2 } from 'lucide-react';

interface Props {
  post: Post;
}

export default function PostComponent({ post }: Props) {
  return (
    <article className="border-b p-4 hover:bg-gray-50 transition-colors">
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          <div
            className="w-12 h-12 rounded-full"
            style={{
              backgroundColor: post.author?.profilePicture?.pictureType.case === 'hexColor'
                ? post.author.profilePicture.pictureType.value
                : '#ccc'
            }}
          />
        </div>

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
            <span className="text-gray-500">
              {new Date(Number(post.createdAt)).toLocaleDateString()}
            </span>
          </div>

          <p className="mt-2 whitespace-pre-wrap">{post.content}</p>

          <div className="flex gap-6 mt-3">
            <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors">
              <Heart className="w-5 h-5" />
              <span>0</span>
            </button>
            <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors">
              <MessageCircle className="w-5 h-5" />
              <span>0</span>
            </button>
            <button className="flex items-center gap-2 text-gray-500 hover:text-green-500 transition-colors">
              <Share2 className="w-5 h-5" />
              <span>0</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
} 