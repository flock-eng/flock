'use client';

import { Construction } from 'lucide-react';

interface Props {
  title?: string;
}

export default function UnderConstruction({ title }: Props) {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-2rem)] text-gray-500">
      <Construction className="w-16 h-16 mb-4 animate-bounce" />
      <h1 className="text-2xl font-semibold mb-2">
        {title || 'Under Construction'}
      </h1>
      <p>This page is coming soon. Check back later!</p>
    </div>
  );
} 