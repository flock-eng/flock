Below is a recommended set of step-by-step instructions for how to extend your existing Next.js authentication-only application to include all of the domain logic found in your SvelteKit application (home feed, profile pages, mock/real API calls via ConnectRPC, etc.). The goal is to have a Next.js app that mirrors your SvelteKit social-media functionality as closely as possible while preserving the existing NextAuth-based authentication.

1. [ ] Create a New Folder Structure for Domain Logic
In your Next.js repository, inside the src folder (or wherever you keep your code), create a new directory structure for your domain logic. A good starting point—mirroring SvelteKit’s src/lib/api—is:

scss
Copy
src/
  app/
    ... (already exists for Next.js routes)
  components/
    ...
  lib/
    api/
      client.ts         // Real ConnectRPC client
      mock-client.ts    // Mock client
      config.ts         // Helper to create the real or mock client
      index.ts          // Re-export all API logic
    ...
You will place the ConnectRPC logic here, along with mock-client logic for local dev/testing.

Why? SvelteKit had src/lib/api/client.ts, mock-client.ts, etc. We’ll replicate that in Next.js so that the rest of our code can call import { api } from '@/lib/api' just like the SvelteKit code calls its own api client.

2. [ ] Install the ConnectRPC Dependencies and Protobuf Stubs
From your SvelteKit code, we see references to:

@connectrpc/connect
@connectrpc/connect-web
@buf/wcygan_flock.bufbuild_es (the generated protobuf stubs)
In your Next.js app, install these packages as well:

bash
Copy
# Make sure your registry is set so PNPM/NPM can pull from the Buf registry
pnpm config set @buf:registry https://buf.build/gen/npm/v1/
# or
npm set @buf:registry https://buf.build/gen/npm/v1/

# Then install
pnpm add @buf/wcygan_flock.bufbuild_es@latest
pnpm add @connectrpc/connect @connectrpc/connect-web
If your Next.js app doesn’t already have them, also ensure you have @bufbuild/protobuf installed.

3. [ ] Create the Real ConnectRPC Client
In src/lib/api/client.ts, replicate the SvelteKit approach for creating a ConnectRPC client. For example:

ts
Copy
// src/lib/api/client.ts
import { createClient } from '@connectrpc/connect';
import { createConnectTransport } from '@connectrpc/connect-web';
import {
  PostService,
  // any other services you need
} from '@buf/wcygan_flock.bufbuild_es/backend/v1/post_pb';
import {
  HomePageService,
  ProfilePageService
} from '@buf/wcygan_flock.bufbuild_es/frontend/v1/home_page_pb'; 
// ^ adapt imports to match your actual .proto-based modules

// Creates a Connect transport using the base URL from an environment variable
const createTransport = (baseUrl: string) => {
  return createConnectTransport({
    baseUrl,
    useBinaryFormat: false
  });
};

// Build the client object:
export const createApiClient = (baseUrl: string) => {
  const transport = createTransport(baseUrl);

  return {
    posts: createClient(PostService, transport),
    homePage: createClient(HomePageService, transport),
    profilePage: createClient(ProfilePageService, transport),
    // ...
  };
};

// Type representing the full set of available RPC clients
export type ApiClient = ReturnType<typeof createApiClient>;
4. [ ] Create the Mock Client
Similarly, create a file mock-client.ts in src/lib/api/ that duplicates the “fake data” logic from SvelteKit. For instance:

ts
Copy
// src/lib/api/mock-client.ts
import type { ApiClient } from './client';

// Example placeholders from the SvelteKit mock:
const createMockPost = (id: string, authorId: string, content: string) => ({
  /* fill in your Post shape as needed */
});

export function createMockApiClient(): ApiClient {
  return {
    posts: {
      createPost: async (request) => {
        // Return some mock data
      },
      getPost: async (request) => { /* ... */ },
      listMostRecentPosts: async (request) => { /* ... */ },
      // etc.
    },
    homePage: {
      getHomePage: async (request) => {
        // Return an array of mock posts
      }
    },
    profilePage: {
      getProfilePage: async (request) => {
        // Return some mock profile + posts
      }
    }
  };
}
5. [ ] Decide Between Mock or Real Client at Runtime
Create a config.ts that picks real or mock based on environment variables, just like the SvelteKit version:

ts
Copy
// src/lib/api/config.ts
import { createApiClient } from './client';
import { createMockApiClient } from './mock-client';
import type { ApiClient } from './client';

function getApiBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL || '';
  if (!url) throw new Error('Missing NEXT_PUBLIC_API_BASE_URL');
  return url;
}

let client: ApiClient;

if (process.env.NEXT_PUBLIC_USE_MOCK_API === 'true') {
  console.log('Using mock ConnectRPC client');
  client = createMockApiClient();
} else {
  console.log('Using real ConnectRPC client');
  client = createApiClient(getApiBaseUrl());
}

export const api = client;  // <--- The exported singleton
Now, anywhere in your Next.js code, you can do:

ts
Copy
import { api } from '@/lib/api/config'
// to call `api.posts.createPost(...)`, etc.
6. [ ] Export All API Types from a Single index.ts
Mirroring SvelteKit’s approach, you can re-export all your proto-based types from index.ts:

ts
Copy
// src/lib/api/index.ts
export { api } from './config';
export type { ApiClient } from './client';

// Re-export any relevant types from the proto definitions
export type {
  Post,
  // ...
} from '@buf/wcygan_flock.bufbuild_es/backend/v1/post_pb';

// ... and so on ...
This makes it easy to import everything from @/lib/api in your Next.js pages/components.

7. [ ] Create the Domain Pages (Home, Profile, etc.) in Next.js
In your SvelteKit app, you have routes like:

/ (Home Page)
/discover
/notifications
/messages
/settings
/profile/[username]
In Next.js App Router, replicate them:

scss
Copy
src/
  app/
    page.tsx                 // Home
    discover/
      page.tsx
    notifications/
      page.tsx
    messages/
      page.tsx
    settings/
      page.tsx
    profile/
      [username]/
        page.tsx
    ...
7.1. [ ] Home Page
Replace your existing minimal src/app/page.tsx with something that fetches posts from api.homePage.getHomePage(), just like in SvelteKit:

tsx
Copy
// src/app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import type { Post } from '@/lib/api'; 

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await api.homePage.getHomePage({});
        setPosts(response.posts ?? []);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError('Failed to load posts');
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <main className="p-4">
      <h1 className="text-2xl mb-4 font-bold">Home</h1>
      {posts.length === 0 ? (
        <div>No posts yet.</div>
      ) : (
        posts.map(post => (
          <div key={post.id?.id} className="border p-4 mb-4">
            <h2>{post.author?.username}</h2>
            <p>{post.content}</p>
          </div>
        ))
      )}
    </main>
  );
}
In SvelteKit, you used onMount; in Next.js you use useEffect for client-side fetching.

7.2. [ ] Profile Page
Create src/app/profile/[username]/page.tsx:

tsx
Copy
'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import type { Post, MiniProfile } from '@/lib/api';

export default function ProfilePage() {
  const { username } = useParams() as { username: string };
  const [userDetails, setUserDetails] = useState<MiniProfile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) return;
    async function fetchProfile() {
      try {
        const resp = await api.profilePage.getProfilePage({
          profile: { id: username } // replicate SvelteKit logic
        });
        setUserDetails(resp.userDetails ?? null);
        setPosts(resp.posts ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [username]);

  if (!username) return <div>No username provided.</div>;
  if (loading) return <div>Loading profile...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  if (!userDetails) return <div>Profile not found.</div>;

  return (
    <main className="p-4">
      <h1 className="text-2xl mb-4">
        {userDetails.firstName} {userDetails.lastName}
      </h1>
      <p>@{userDetails.username}</p>
      <hr className="my-4" />

      <h2 className="text-xl font-semibold">Posts</h2>
      {posts.length === 0 ? (
        <div>No posts yet.</div>
      ) : (
        posts.map(post => (
          <div key={post.id?.id} className="border p-4 mb-4">
            <p>{post.content}</p>
          </div>
        ))
      )}
    </main>
  );
}
You now have a dynamic route [username] just like in SvelteKit.

7.3. [ ] Under-Construction Pages
Make src/app/discover/page.tsx, etc., with an “Under Construction” placeholder:

tsx
Copy
// src/app/discover/page.tsx
export default function DiscoverPage() {
  return (
    <main className="p-4">
      <h1 className="text-2xl">Discover</h1>
      <p>Under Construction!</p>
    </main>
  );
}
Repeat for /notifications, /messages, /settings.

8. [ ] Create Reusable Components (Sidebar, PostComponent, etc.)
8.1. [ ] Sidebar
In SvelteKit, you had a Sidebar.svelte that rendered links and user info. In Next.js, create src/components/Sidebar.tsx:

tsx
Copy
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white w-64 p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-6">Flock</h1>

      <Link
        href="/"
        className={`block py-2 px-4 mb-2 rounded ${pathname === '/' ? 'bg-gray-100' : ''}`}
      >
        Home
      </Link>

      <Link
        href="/profile/me"
        className={`block py-2 px-4 mb-2 rounded ${pathname.startsWith('/profile') ? 'bg-gray-100' : ''}`}
      >
        Profile
      </Link>

      <Link href="/discover" className="block py-2 px-4 mb-2 rounded">
        Discover
      </Link>
      <Link href="/notifications" className="block py-2 px-4 mb-2 rounded">
        Notifications
      </Link>
      <Link href="/messages" className="block py-2 px-4 mb-2 rounded">
        Messages
      </Link>
      <Link href="/settings" className="block py-2 px-4 mb-2 rounded">
        Settings
      </Link>

      {/* Additional actions like New Post, etc. */}
    </nav>
  );
}
8.2. [ ] PostComponent
To mimic PostComponent.svelte, create PostComponent.tsx:

tsx
Copy
// src/components/PostComponent.tsx
import type { Post } from '@/lib/api';

interface Props {
  post: Post;
}

export default function PostComponent({ post }: Props) {
  return (
    <article className="rounded border p-4 mb-4 shadow-sm">
      <div className="font-semibold">
        {post.author?.firstName} {post.author?.lastName}
      </div>
      <div className="text-sm text-gray-600">@{post.author?.username}</div>
      <p className="mt-2">{post.content}</p>
      <div className="text-xs text-gray-400 mt-2">
        {new Date(Number(post.createdAt)).toLocaleString()}
      </div>
    </article>
  );
}
8.3. [ ] CreatePostForm / Modal
If you want a modal for creating posts (as in SvelteKit’s CreatePostForm.svelte + Modal.svelte), you can replicate with standard React patterns. Example:

tsx
Copy
// src/components/CreatePostForm.tsx
'use client';

import { useState } from 'react';
import { api } from '@/lib/api';

interface Props {
  onSuccess: () => void;
  onCancel: () => void;
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
      // Hardcode a user ID for now, or get from session
      await api.posts.createPost({
        author: { id: 'mockuser' },
        content: content.trim()
      });
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create post');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border border-gray-300 rounded p-2"
        placeholder="What's on your mind?"
      />
      {error && <div className="text-red-500">{error}</div>}
      <div className="mt-2 flex justify-end gap-2">
        <button type="button" onClick={onCancel} disabled={loading}>
          Cancel
        </button>
        <button type="submit" disabled={loading}>
          {loading ? 'Posting...' : 'Post'}
        </button>
      </div>
    </form>
  );
}
For a modal, you can use a simple CSS overlay or a library like react-modal.

9. [ ] Update Your Global Layout to Include Sidebar & a Main Content Area
Right now, your src/app/layout.tsx is minimal. You can integrate the sidebar or a top-level “shell” layout similar to SvelteKit’s +layout.svelte.

tsx
Copy
// src/app/layout.tsx
import { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import './globals.css';

export const metadata = {
  title: 'Flock with Next.js',
  description: 'Your social media platform clone'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <div className="min-h-screen grid grid-cols-[250px_1fr] gap-4">
          <Sidebar />
          <main className="p-4">{children}</main>
        </div>
      </body>
    </html>
  );
}
This mirrors the two-column layout from SvelteKit. Tweak your Tailwind classes as you see fit.

10. [ ] Tie In Authentication to Protect Pages
You already have NextAuth with Keycloak. The existing middleware.ts is set to redirect to /login if unauthenticated. Adjust it to also allow certain paths if you like, or keep it as is:

ts
Copy
// src/middleware.ts
import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isOnLoginPage = req.nextUrl.pathname === "/login"

  if (!isLoggedIn && !isOnLoginPage) {
    return NextResponse.redirect(new URL("/login", req.url))
  }
  if (isLoggedIn && isOnLoginPage) {
    return NextResponse.redirect(new URL("/", req.url))
  }
  return NextResponse.next()
})

// Optionally adjust config
export const config = {
  matcher: [
    "/((?!api|_next|favicon.ico).*)"
  ],
}
This ensures that to reach /, /profile/..., etc., users must be signed in.

11. [ ] Set Up Environment Variables
NEXT_PUBLIC_API_BASE_URL (or whichever name you like) for the backend host.
NEXT_PUBLIC_USE_MOCK_API to toggle between mock and real.
In Next.js, environment variables with the NEXT_PUBLIC_ prefix become available in client-side code. Make sure you set them in .env.local or in your deployment environment.

bash
Copy
# .env.local
NEXT_PUBLIC_API_BASE_URL=https://api.myapp.com
NEXT_PUBLIC_USE_MOCK_API=true
12. [ ] TailwindCSS & Styles
You already have globals.css with Tailwind directives. If you want your app to look more like the SvelteKit version, you can copy over the custom classes from app.css in the SvelteKit codebase:

css
Copy
/* e.g. from SvelteKit app.css, adapt as needed */
.app-layout {
  @apply grid min-h-screen grid-cols-[250px_1fr_300px] gap-5 bg-gray-50 p-5;
}
...
Use them in your Next.js layout or components to replicate the same styling structure.

13. [ ] “Under Construction” Component
If you want a dedicated “UnderConstruction” component:

tsx
Copy
// src/components/UnderConstruction.tsx
export default function UnderConstruction() {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <svg /* gear icon or something animated */ />
      <p className="mt-4 text-gray-600">This page is under construction. Check back soon!</p>
    </div>
  );
}
Then in pages like discover/page.tsx, just render <UnderConstruction />.

14. [ ] Local vs. Kubernetes Deployment
Local dev: You can run pnpm dev or npm run dev and rely on environment variables in .env.local.
Kubernetes:
Make sure to build a Docker image for your Next.js app.
Provide environment variables as secrets/config maps.
Reference them in the Deployment spec for your container.
You can also use Telepresence if you want to intercept traffic from your cluster to your local machine, just like the SvelteKit approach.

15. [ ] Confirm Everything Works
Authentication: Confirm you can log in at /login and see your user’s name on the homepage.
Home Feed: Confirm the api.homePage.getHomePage() call returns posts (mocked or real).
Profile Page: Check http://localhost:3000/profile/me or profile/jane and see mock or real data.
Under Construction pages: discover, notifications, messages, and settings show placeholders.
Layout & Sidebar: The sidebar with relevant links and the main content area appear as in SvelteKit.
Once these steps are done, you will have a Next.js application that mimics the SvelteKit domain logic (home feed, profile, posts, placeholders for under-construction pages, etc.) while preserving the NextAuth-based Keycloak authentication.

Summary
Add a ConnectRPC client in src/lib/api, both real and mock.
Replicate your SvelteKit routes as Next.js routes in app/.
Port your SvelteKit components (PostComponent, CreatePostForm, Sidebar, etc.) into Next.js React components.
Style them with Tailwind, optionally copying over your SvelteKit app.css rules.
Use environment variables (NEXT_PUBLIC_API_BASE_URL) to toggle between mock and real.
Confirm that existing NextAuth logic still protects routes as desired.
With these changes, your Next.js application will have the same domain features as your SvelteKit version, all while maintaining your existing authentication logic. Enjoy building your extended Next.js social media app!