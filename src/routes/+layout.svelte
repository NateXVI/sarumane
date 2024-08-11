<script>
	import '../app.css';
</script>

<div class="flex min-h-screen w-full flex-col bg-gray-800">
	<main class="flex flex-1 flex-col">
		<slot />
	</main>
	<footer class="px-6 py-4">
		<p class="text-lg text-white">
			Stroke order images taken from <a
				href="https://kanjivg.tagaini.net/"
				class="text-blue-400 underline">KanjiVG</a
			> ❤️️
		</p>
	</footer>
</div>
