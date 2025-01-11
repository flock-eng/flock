<script lang="ts">
	import '../app.css';
	import Sidebar from '$lib/components/Sidebar.svelte';
</script>

<div class="flex min-h-screen bg-gray-50">
	<Sidebar />
	<main class="flex-1 max-w-3xl border-x border-gray-200 bg-white min-h-screen">
		<div class="sticky top-0 z-10 backdrop-blur-sm bg-white/90 border-b border-gray-200">
			<div class="flex items-center gap-4 px-6 py-3">
				<div class="flex-1">
					<div class="relative">
						<svg xmlns="http://www.w3.org/2000/svg" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
						</svg>
						<input 
							type="search" 
							placeholder="Search Flock..." 
							class="w-full pl-10 pr-4 py-2 bg-gray-100 border border-transparent rounded-xl focus:bg-white focus:border-gray-200 focus:ring-0 transition-colors"
						>
					</div>
				</div>
				<h1 class="text-xl font-bold">Home</h1>
			</div>
		</div>
		<div class="px-6">
			<slot />
		</div>
	</main>
	<aside class="hidden lg:block w-[380px] pl-8 pr-4 py-4">
		<div class="sticky top-4 space-y-6">
			<!-- Advertisement -->
			<div class="bg-white rounded-xl p-4 border border-gray-200">
				<h2 class="text-lg font-bold mb-2">Special Offer</h2>
				<p class="text-gray-600 mb-4">Get 10% off on Bitcoin purchases today!</p>
				<button class="text-blue-500 font-semibold hover:text-blue-600">Learn More →</button>
			</div>

			<!-- Who to Follow -->
			<div class="bg-white rounded-xl p-4 border border-gray-200">
				<h2 class="text-lg font-bold mb-4">Who to Follow</h2>
				<div class="space-y-4">
					<div class="flex items-center justify-between">
						<div class="flex items-center gap-3">
							<div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
								JD
							</div>
							<div>
								<p class="font-semibold">John Doe</p>
								<p class="text-sm text-gray-500">@johndoe</p>
							</div>
						</div>
						<button class="px-4 py-1.5 bg-gray-900 text-white rounded-full text-sm font-semibold hover:bg-gray-800">
							Follow
						</button>
					</div>
					<div class="flex items-center justify-between">
						<div class="flex items-center gap-3">
							<div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-semibold">
								JS
							</div>
							<div>
								<p class="font-semibold">Jane Smith</p>
								<p class="text-sm text-gray-500">@janesmith</p>
							</div>
						</div>
						<button class="px-4 py-1.5 bg-gray-900 text-white rounded-full text-sm font-semibold hover:bg-gray-800">
							Follow
						</button>
					</div>
				</div>
			</div>
		</div>
	</aside>
</div>
