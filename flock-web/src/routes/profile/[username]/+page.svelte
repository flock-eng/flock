<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { ApiClientMock as api } from '$lib/api/mock-client';
    import type { Post, MiniProfile } from '$lib/api';

    let userDetails: MiniProfile | undefined;
    let posts: Post[] = [];
    let loading = true;
    let error: string | null = null;

    $: username = $page.params.username;

    onMount(async () => {
        try {
            // In a real app, we'd have a way to get the profile ID from the username
            // For now, we'll just use the username as the ID
            const mockProfileId = username;
            const response = await api.profilePage.getProfilePage({
                profile: { $typeName: 'backend.v1.ProfileKey', id: mockProfileId }
            });
            userDetails = response.userDetails;
            posts = response.posts;
        } catch (e) {
            error = e instanceof Error ? e.message : 'Failed to load profile';
        } finally {
            loading = false;
        }
    });
</script>

<div class="max-w-4xl mx-auto p-6">
    {#if loading}
        <div class="flex justify-center items-center h-64">
            <div class="text-gray-600">Loading profile...</div>
        </div>
    {:else if error}
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
        </div>
    {:else if userDetails}
        <!-- Profile Header -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
            <div class="flex items-center gap-4">
                <!-- Profile Picture -->
                <div class="w-24 h-24 rounded-full flex items-center justify-center text-white text-2xl"
                     style="background-color: {userDetails.profilePicture?.pictureType?.case === 'hexColor' 
                        ? userDetails.profilePicture.pictureType.value 
                        : '#4A90E2'}">
                    {userDetails.firstName[0]}{userDetails.lastName[0]}
                </div>
                
                <!-- Profile Info -->
                <div>
                    <h1 class="text-2xl font-bold">{userDetails.firstName} {userDetails.lastName}</h1>
                    <p class="text-gray-600">@{userDetails.username}</p>
                </div>
            </div>
        </div>

        <!-- Posts Section -->
        <div class="space-y-4">
            <h2 class="text-xl font-semibold mb-4">Posts</h2>
            {#if posts.length === 0}
                <p class="text-gray-600">No posts yet.</p>
            {:else}
                {#each posts as post}
                    <div class="bg-white rounded-lg shadow-md p-4">
                        <div class="flex items-center gap-2 mb-2">
                            <!-- Author Avatar -->
                            <div class="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm"
                                 style="background-color: {post.author?.profilePicture?.pictureType?.case === 'hexColor' 
                                    ? post.author.profilePicture.pictureType.value 
                                    : '#4A90E2'}">
                                {post.author?.firstName?.[0]}{post.author?.lastName?.[0]}
                            </div>
                            <div>
                                <div class="font-semibold">{post.author?.firstName} {post.author?.lastName}</div>
                                <div class="text-sm text-gray-600">@{post.author?.username}</div>
                            </div>
                        </div>
                        <p class="text-gray-800">{post.content}</p>
                        <div class="text-sm text-gray-500 mt-2">
                            {new Date(Number(post.createdAt)).toLocaleString()}
                        </div>
                    </div>
                {/each}
            {/if}
        </div>
    {:else}
        <div class="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
            Profile not found.
        </div>
    {/if}
</div> 