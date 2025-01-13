<script lang="ts">
	import type { Post } from '$lib/api';

	export let post: Post;
</script>

<div class="space-y-3 rounded-lg bg-white p-5 shadow-sm">
	<div class="flex items-center gap-3">
		<!-- Author Avatar -->
		<div
			class="user-avatar"
			style="background-color: {post.author?.profilePicture?.pictureType?.case === 'hexColor'
				? post.author.profilePicture.pictureType.value
				: '#4A90E2'}"
		>
			{post.author?.firstName?.[0]}{post.author?.lastName?.[0]}
		</div>
		<div>
			<div class="user-info">{post.author?.firstName} {post.author?.lastName}</div>
			<div class="user-handle">@{post.author?.username}</div>
		</div>
	</div>

	<p class="text-gray-800">{post.content}</p>

	<div class="text-sm text-gray-500">
		{new Date(Number(post.createdAt)).toLocaleString()}
	</div>
</div>
