<script lang="ts">
    import { page } from '$app/stores';
    import { derived } from 'svelte/store';

    const activeRoute = derived(page, ($page) => $page.url.pathname);

    const routes = [
        { path: '/', label: 'Home' },
        { path: '/profile/me', label: 'Profile' },
        { path: '/discover', label: 'Discover' },
        { path: '/notifications', label: 'Notifications' },
        { path: '/messages', label: 'Messages' },
        { path: '/settings', label: 'Settings' }
    ];
</script>

<nav class="flex flex-col w-64 h-screen bg-gray-800 text-white">
    <div class="p-4">
        <h1 class="text-2xl font-bold">Flock</h1>
    </div>
    
    <ul class="flex-1 space-y-2">
        {#each routes as route}
            <li>
                <a
                    href={route.path}
                    class="block px-4 py-2 hover:bg-gray-700 transition-colors"
                    class:bg-gray-700={$activeRoute === route.path || 
                        (route.path.startsWith('/profile') && $activeRoute.startsWith('/profile'))}
                >
                    {route.label}
                </a>
            </li>
        {/each}
    </ul>
</nav> 