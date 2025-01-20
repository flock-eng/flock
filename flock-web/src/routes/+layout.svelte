<script lang="ts">
	import '../app.css';
	import Modal from '$lib/components/Modal.svelte';
	import CreatePostForm from '$lib/components/CreatePostForm.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { page } from '$app/stores';

	let isCreatePostModalOpen = false;

	function handleCreatePostSuccess() {
		isCreatePostModalOpen = false;
		// TODO: Refresh the posts list
	}

	$: user = $page.data.user;
</script>

<div class="app-layout">
	<Sidebar {user} onNewPost={() => (isCreatePostModalOpen = true)} />

	<!-- Main Content Area -->
	<main class="main-content">
		<!-- Search Bar -->
		<header class="border-b border-gray-200 p-5">
			<div class="search-container">
				<label for="search" class="sr-only">Search Flock</label>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="search-icon"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					aria-hidden="true"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>
				<input
					id="search"
					type="search"
					placeholder="Search Flock..."
					class="search-input"
					aria-label="Search Flock"
				/>
			</div>
		</header>

		<!-- Content -->
		<div class="p-5">
			<slot />
		</div>
	</main>

	<!-- Right Sidebar -->
	<aside class="sidebar-container space-y-5" aria-label="Supplementary content">

		<!-- Premium Offer -->
		<section class="border-t pt-5 space-y-3">
			<h2 class="text-lg font-semibold">Special Offer!</h2>
			<p class="text-gray-600">Buy Premium for only $9.99!</p>
			<button
				type="button"
				class="font-medium text-blue-500 transition-colors hover:text-blue-600"
				aria-label="Get Premium subscription"
			>
				Get Premium
			</button>
		</section>

		<!-- Sell Ad Space -->
		<section class="space-y-3 border-t pt-5">
			<h2 class="text-lg font-semibold">Advertise with Us</h2>
			<p class="text-gray-600">Your Ad here!</p>
			<button
				type="button"
				class="font-medium text-blue-500 transition-colors hover:text-blue-600"
				aria-label="Learn more about advertising opportunities"
			>
				Place Ad
			</button>
		</section>


		<!-- Advertisement -->
		<section class="space-y-3">
			<h2 class="text-lg font-semibold">Advertisement</h2>
			<p class="text-gray-600">Buy Bitcoin for 5% off!</p>
			<button
				type="button"
				class="font-medium text-blue-500 transition-colors hover:text-blue-600"
				aria-label="Learn more about Bitcoin offer"
			>
				Learn More
			</button>
		</section>

		<!-- Who to Follow -->
		<section class="border-t pt-5">
			<h2 class="mb-4 text-lg font-semibold">Who to Follow</h2>
			<div class="space-y-4">
				<div class="flex items-center justify-between gap-3">
					<div class="flex items-center gap-3">
						<div class="user-avatar" aria-hidden="true">U</div>
						<div>
							<div class="user-info">User Name</div>
							<div class="user-handle">@username</div>
						</div>
					</div>
					<button
						type="button"
						class="rounded-lg bg-blue-500 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-600"
					>
						Follow
					</button>
				</div>
			</div>
		</section>
	</aside>
</div>

<Modal
	isOpen={isCreatePostModalOpen}
	onClose={() => (isCreatePostModalOpen = false)}
	title="Create a New Post"
>
	<CreatePostForm
		onSuccess={handleCreatePostSuccess}
		onCancel={() => (isCreatePostModalOpen = false)}
	/>
</Modal>
