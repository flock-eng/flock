<script lang="ts">
	import { page } from '$app/stores';
	import { derived } from 'svelte/store';

	const activeRoute = derived(page, ($page) => $page.url.pathname);

	// TODO: Replace with actual user data
	const user = {
		name: 'big bot',
		initials: 'BB'
	};

	const routes = [
		{
			path: '/',
			label: 'Home',
			icon: 'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
		},
		{
			path: '/profile/me',
			label: 'Profile',
			icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
		},
		{
			path: '/discover',
			label: 'Discover',
			icon: 'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
		},
		{
			path: '/notifications',
			label: 'Notifications',
			icon: 'M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0'
		},
		{
			path: '/messages',
			label: 'Messages',
			icon: 'M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z'
		},
		{
			path: '/settings',
			label: 'Settings',
			icon: 'M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z'
		}
	];
</script>

<nav class="sidebar-container">
	<div class="py-4">
		<h1 class="text-2xl font-bold text-blue-500">Flock</h1>
	</div>

	<!-- User Greeting -->
	<div class="mb-6 flex items-center gap-3">
		<div class="user-avatar">
			{user.initials}
		</div>
		<div>
			<p class="font-medium">Hello,</p>
			<p class="text-lg font-bold">{user.name}</p>
		</div>
	</div>

	<ul class="flex-1 space-y-1">
		{#each routes as route}
			<li>
				<a
					href={route.path}
					class="nav-link"
					class:bg-gray-50={$activeRoute === route.path ||
						(route.path.startsWith('/profile') && $activeRoute.startsWith('/profile'))}
					class:font-semibold={$activeRoute === route.path ||
						(route.path.startsWith('/profile') && $activeRoute.startsWith('/profile'))}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="nav-icon"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d={route.icon} />
					</svg>
					<span>{route.label}</span>
				</a>
			</li>
		{/each}

		<li class="pt-4">
			<button class="btn-primary w-full"> New Post </button>
		</li>
		<li>
			<button class="btn-danger w-full text-left"> Logout </button>
		</li>
	</ul>
</nav>
