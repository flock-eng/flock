<script lang="ts">
	export let isOpen = false;
	export let onClose: () => void;
	export let title: string;

	// Focus trap
	let modalContent: HTMLElement;
	let previousActiveElement: HTMLElement | null = null;

	$: if (isOpen) {
		previousActiveElement = document.activeElement as HTMLElement;
		// Next tick to ensure modal content is mounted
		setTimeout(() => {
			const firstFocusable = modalContent?.querySelector('button') as HTMLElement;
			firstFocusable?.focus();
		}, 0);
	} else if (previousActiveElement) {
		previousActiveElement.focus();
	}

	function handleEscape(event: KeyboardEvent) {
		if (event.key === 'Escape' && isOpen) {
			onClose();
		}
	}

	function handleTab(event: KeyboardEvent) {
		if (!modalContent || event.key !== 'Tab') return;

		const focusableElements = modalContent.querySelectorAll(
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
		);
		const firstFocusable = focusableElements[0] as HTMLElement;
		const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

		if (event.shiftKey && document.activeElement === firstFocusable) {
			event.preventDefault();
			lastFocusable.focus();
		} else if (!event.shiftKey && document.activeElement === lastFocusable) {
			event.preventDefault();
			firstFocusable.focus();
		}
	}
</script>

<svelte:window on:keydown={handleEscape} />

{#if isOpen}
	<div
		bind:this={modalContent}
		class="fixed inset-0 z-50 flex items-center justify-center"
		role="dialog"
		aria-modal="true"
		aria-labelledby="modal-title"
		tabindex="0" 
		on:keydown={handleTab}
	>
		<button
			class="absolute inset-0 h-full w-full bg-black bg-opacity-50"
			on:click={onClose}
			aria-label="Close modal"
		></button>
		
		<!-- Modal Content -->
		<section 
			class="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-xl"
		>
			<div class="mb-4 flex items-center justify-between">
				<h2 id="modal-title" class="text-xl font-semibold">{title}</h2>
				<button
					class="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
					on:click={onClose}
					aria-label="Close modal"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						aria-hidden="true"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
			<div>
				<slot />
			</div>
		</section>
	</div>
{/if}
