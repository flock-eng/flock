'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import { Avatar } from './ui/Avatar';
import { Button } from './ui/Button';
import { Card, CardContent, CardFooter } from './ui/Card';
import { Textarea } from './ui/Textarea';

interface Props {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function CreatePostForm({ onSuccess, onCancel }: Props) {
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) {
      setError('Post content cannot be empty');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await api.posts.createPost({
        author: { id: 'mockuser' }, // TODO: Get from auth session
        content: content.trim()
      });
      setContent('');
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create post');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="border-x-0 rounded-none shadow-none">
      <form onSubmit={handleSubmit}>
        <CardContent className="p-4">
          <div className="flex gap-3">
            <Avatar hexColor="#4A90E2" />

            <div className="flex-grow">
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's happening?"
                className="min-h-[100px] resize-none border-0 focus:ring-0 text-lg p-0"
              />

              {error && (
                <div className="text-red-500 text-sm mt-2">{error}</div>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="px-4 py-3 border-t">
          <div className="flex justify-between items-center w-full">
            <div className="text-sm text-gray-500">
              {content.length}/280
            </div>

            <div className="flex gap-2">
              {onCancel && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={onCancel}
                  disabled={loading}
                >
                  Cancel
                </Button>
              )}
              <Button
                type="submit"
                isLoading={loading}
                disabled={loading || !content.trim()}
              >
                Post
              </Button>
            </div>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}