<script lang="ts">
	import StrokeOrder from '$lib/components/StrokeOrder.svelte';

	let input = $state<HTMLInputElement>();

	function handleKeypress(event: KeyboardEvent) {
		console.log(event);
		if (!input) return;
		if (event.key === '/' && document.activeElement !== input) {
			input.focus();
			event.preventDefault();
		}
	}

	let text = $state('');
</script>

<svelte:window onkeypress={handleKeypress} />

<div class="flex flex-1 flex-col items-center justify-center gap-8 p-20">
	<div class="flex min-h-48 flex-wrap justify-center">
		{#each text as char}
			<StrokeOrder {char} />
		{/each}
	</div>
	<input
		class="scroll-mb-5 rounded-lg border px-4 py-2 text-center text-lg"
		placeholder="ここにタイプする"
		bind:this={input}
		bind:value={text}
		autofocus
	/>
</div>
