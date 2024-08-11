<script lang="ts">
	import charHasImage from '$lib/charHasImage';
	let { char }: { char: string } = $props();

	let failedToLoad = $state(!charHasImage(char));

	$effect(() => {
		failedToLoad = !charHasImage(char);
		console.log(char, 'in range:', charHasImage(char), 'failed:', failedToLoad);
		if (char.trim() === '') {
			failedToLoad = true;
		}
	});

	function charToPath(char: string) {
		return `/images/kanjivg/${char.charCodeAt(0).toString(16).padStart(5, '0')}.svg`;
	}
</script>

<div class="relative flex aspect-square w-48 items-center justify-center overflow-clip">
	{#if failedToLoad}
		<span class="char">{char.slice(0, 1)}</span>
	{:else}
		<img
			class="absolute aspect-square h-full w-full"
			src={charToPath(char)}
			alt={char}
			onerror={() => (failedToLoad = true)}
		/>
	{/if}
</div>

<style>
	div {
		background-image: url('/images/grid.svg');
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat;
	}

	span {
		font-size: 8.5rem;
		font-family: 'M PLUS Rounded 1c', sans-serif;
		font-weight: 300;
		font-style: normal;
	}
</style>
