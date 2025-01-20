'use client';

import { useState } from 'react';
import { api } from '@/lib/api';

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
    <form onSubmit={handleSubmit} className="p-4 border-b">
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-gray-200" />
        </div>

        <div className="flex-grow">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's happening?"
            className="w-full min-h-[100px] resize-none border-0 focus:ring-0 text-lg"
          />

          {error && (
            <div className="text-red-500 text-sm mb-2">{error}</div>
          )}

          <div className="flex justify-between items-center mt-2">
            <div className="text-sm text-gray-500">
              {content.length}/280
            </div>

            <div className="flex gap-2">
              {onCancel && (
                <button
                  type="button"
                  onClick={onCancel}
                  disabled={loading}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={loading || !content.trim()}
                className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Posting...' : 'Post'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
} 