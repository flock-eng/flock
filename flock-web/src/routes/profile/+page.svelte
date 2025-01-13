<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		// In a real app, this would redirect to the logged-in user's profile
		goto('/profile/mockuser');
	});
</script>

<div class="flex h-64 items-center justify-center">
	<div class="text-gray-600">Redirecting to your profile...</div>
</div>
