<script lang="ts">
	import '../app.css';
	import Sidebar from '$lib/components/Sidebar.svelte';
</script>

<div class="flex min-h-screen bg-gray-100">
	<Sidebar />
	<main class="flex-1 p-6 overflow-auto">
		<slot />
	</main>
</div>
