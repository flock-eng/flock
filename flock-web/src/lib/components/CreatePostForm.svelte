<script lang="ts">
	import { createApiClient } from '$lib/api/client';
	import type { ProfileKey } from '@buf/wcygan_flock.bufbuild_es/backend/v1/profile_pb';

	export let onSuccess: () => void;
	export let onCancel: () => void;

	let content = '';
	let isSubmitting = false;
	let error: string | null = null;

	// TODO: Replace with actual user data
	const mockUser: ProfileKey = {
		$typeName: 'backend.v1.ProfileKey',
		id: 'mockuser'
	};

	async function handleSubmit() {
		if (!content.trim()) {
			error = 'Post content cannot be empty';
			return;
		}

		isSubmitting = true;
		error = null;

		try {
			const api = createApiClient(import.meta.env.VITE_PUBLIC_API_BASE_URL);
			await api.posts.createPost({
				author: mockUser,
				content: content.trim()
			});
			onSuccess();
		} catch (e) {
			error = e instanceof Error ? e.message : 'Failed to create post';
		} finally {
			isSubmitting = false;
		}
	}
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-4">
	<div>
		<textarea
			bind:value={content}
			placeholder="What's on your mind?"
			class="h-32 w-full resize-none rounded-lg border border-gray-200 p-4 focus:border-blue-500 focus:outline-none"
			maxlength="280"
		/>
		<div class="mt-1 flex justify-between text-sm text-gray-500">
			<span>{content.length}/280</span>
		</div>
	</div>

	{#if error}
		<div class="rounded-lg bg-red-50 p-3 text-sm text-red-600">
			{error}
		</div>
	{/if}

	<div class="flex justify-end gap-3">
		<button
			type="button"
			on:click={onCancel}
			class="rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-100"
			disabled={isSubmitting}
		>
			Cancel
		</button>
		<button
			type="submit"
			class="rounded-lg bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600 disabled:opacity-50"
			disabled={isSubmitting}
		>
			{#if isSubmitting}
				Posting...
			{:else}
				Post
			{/if}
		</button>
	</div>
</form> 