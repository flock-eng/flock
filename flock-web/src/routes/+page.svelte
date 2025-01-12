<script lang="ts">
    import { onMount } from 'svelte';
    import { ApiClientMock as ApiClient } from '$lib/api/mock-client';
    import PostComponent from '$lib/components/PostComponent.svelte';
    import type { Post } from '@buf/wcygan_flock.bufbuild_es/backend/v1/post_pb';

    let posts: Post[] = [];
    let loading = true;
    let error: string | null = null;

    onMount(async () => {
        try {
            const response = await ApiClient.homePage.getHomePage({});
            posts = response.posts;
        } catch (e) {
            error = e instanceof Error ? e.message : 'Failed to load posts';
        } finally {
            loading = false;
        }
    });
</script>

<div class="max-w-2xl mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6">Home</h1>
    
    {#if loading}
        <div class="text-center py-8">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            <p class="mt-2 text-gray-600">Loading posts...</p>
        </div>
    {:else if error}
        <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
        </div>
    {:else if posts.length === 0}
        <div class="text-center py-8 text-gray-500">
            No posts yet. Be the first to post!
        </div>
    {:else}
        <div class="space-y-4">
            {#each posts as post (post.id?.id)}
                <PostComponent {post} />
            {/each}
        </div>
    {/if}
</div>
