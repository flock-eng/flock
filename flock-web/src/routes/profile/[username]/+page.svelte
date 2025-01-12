<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { ApiClientMock as api } from '$lib/api/mock-client';
	import type { Post, MiniProfile } from '$lib/api';
	import PostComponent from '$lib/components/PostComponent.svelte';

	let userDetails: MiniProfile | undefined;
	let posts: Post[] = [];
	let loading = true;
	let error: string | null = null;

	$: username = $page.params.username;

	onMount(async () => {
		try {
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

<div class="mx-auto max-w-4xl p-6">
	{#if loading}
		<div class="flex h-64 items-center justify-center">
			<div class="text-gray-600">Loading profile...</div>
		</div>
	{:else if error}
		<div class="rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
			{error}
		</div>
	{:else if userDetails}
		<!-- Profile Header -->
		<div class="mb-6 rounded-lg bg-white p-6 shadow-sm">
			<div class="flex items-center gap-4">
				<!-- Profile Picture -->
				<div
					class="user-avatar h-24 w-24 text-2xl"
					style="background-color: {userDetails.profilePicture?.pictureType?.case === 'hexColor'
						? userDetails.profilePicture.pictureType.value
						: '#4A90E2'}"
				>
					{userDetails.firstName[0]}{userDetails.lastName[0]}
				</div>

				<!-- Profile Info -->
				<div>
					<h1 class="text-2xl font-bold">{userDetails.firstName} {userDetails.lastName}</h1>
					<p class="user-handle">@{userDetails.username}</p>
				</div>
			</div>
		</div>

		<!-- Posts Section -->
		<div class="space-y-4">
			<h2 class="mb-4 text-xl font-semibold">Posts</h2>
			{#if posts.length === 0}
				<p class="text-gray-600">No posts yet.</p>
			{:else}
				{#each posts as post}
					<PostComponent {post} />
				{/each}
			{/if}
		</div>
	{:else}
		<div class="rounded border border-yellow-400 bg-yellow-100 px-4 py-3 text-yellow-700">
			Profile not found.
		</div>
	{/if}
</div>
