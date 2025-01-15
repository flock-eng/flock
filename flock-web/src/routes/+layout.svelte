<script lang="ts">
	import '../app.css';
	import Modal from '$lib/components/Modal.svelte';
	import CreatePostForm from '$lib/components/CreatePostForm.svelte';

	let isCreatePostModalOpen = false;

	function handleCreatePostSuccess() {
		isCreatePostModalOpen = false;
		// TODO: Refresh the posts list
	}
</script>

<div class="app-layout">
	<!-- Left Sidebar -->
	<aside class="sidebar-container">
		<div class="mb-5 text-2xl font-bold">Flock</div>
		<div class="mb-5 text-gray-600">Hello, big bot</div>

		<nav class="mb-8 flex flex-col gap-2">
			<a href="/" class="nav-link">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="nav-icon"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
					/>
				</svg>
				Home
			</a>
			<a href="/profile" class="nav-link">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="nav-icon"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
					/>
				</svg>
				Profile
			</a>
			<a href="/discover" class="nav-link">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="nav-icon"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
					/>
				</svg>
				Discover
			</a>
			<a href="/notifications" class="nav-link">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="nav-icon"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
					/>
				</svg>
				Notifications
			</a>
			<a href="/messages" class="nav-link">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="nav-icon"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
					/>
				</svg>
				Messages
			</a>
			<a href="/settings" class="nav-link">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="nav-icon"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
					/>
				</svg>
				Settings
			</a>
		</nav>

		<div class="flex flex-col gap-3">
			<button class="btn-primary" on:click={() => (isCreatePostModalOpen = true)}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="nav-icon"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
				</svg>
				New Post!
			</button>

			<a href="/logout" class="btn-danger">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="nav-icon"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
					/>
				</svg>
				Logout
			</a>
		</div>
	</aside>

	<!-- Main Content Area -->
	<main class="main-content">
		<!-- Search Bar -->
		<header class="border-b border-gray-200 p-5">
			<div class="search-container">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="search-icon"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>
				<input type="search" placeholder="Search Flock..." class="search-input" />
			</div>
		</header>

		<!-- Content -->
		<div class="p-5">
			<slot />
		</div>
	</main>

	<!-- Right Sidebar -->
	<aside class="sidebar-container space-y-5">
		<!-- Advertisement -->
		<div class="space-y-3">
			<h3 class="text-lg font-semibold">Advertisement</h3>
			<p class="text-gray-600">Buy Bitcoin for 5% off!</p>
			<button class="font-medium text-blue-500 transition-colors hover:text-blue-600">
				Learn More
			</button>
		</div>

		<!-- Who to Follow -->
		<div class="border-t pt-5">
			<h3 class="mb-4 text-lg font-semibold">Who to Follow</h3>
			<div class="space-y-4">
				<div class="flex items-center justify-between gap-3">
					<div class="flex items-center gap-3">
						<div class="user-avatar">U</div>
						<div>
							<div class="user-info">User Name</div>
							<div class="user-handle">@username</div>
						</div>
					</div>
					<button
						class="rounded-lg bg-blue-500 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-600"
					>
						Follow
					</button>
				</div>
			</div>
		</div>
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
