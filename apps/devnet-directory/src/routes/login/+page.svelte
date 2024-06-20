<script>
	import Icon from "$lib/components/icon/icon.svelte";
	import { randomArrayItem } from "$lib/util";
	import { onMount } from "svelte";

	const digitsCount = 100;
	const availableDigits = [0, 1];
	const digits = Array(digitsCount * digitsCount).fill(0);

	const randomDigitIndex = () => Math.floor(Math.random() * digits.length);

	const fillGrid = () => {
		for(let i = 0; i < digits.length; i++) {
			digits[i] = randomArrayItem(availableDigits);
		}
	};

	const updateDigits = () => {
		for(let i = 0; i < 200; i++) {
			digits[randomDigitIndex()] = randomArrayItem(digits);
		}
	};

	onMount(() => {
		fillGrid();

		setInterval(() => {
			window.requestAnimationFrame(updateDigits)
		}, 200);
	});
</script>

<div
	class="absolute left-0 top-0 w-screen h-screen grid overflow-hidden"
	style:grid-template-columns={`repeat(${digitsCount}, 1fr)`}
	style:grid-template-rows={`repeat(${digitsCount}, 1fr)`}
>
	{#each digits as digit}
		<div class="text-secondary flex items-center justify-center">
			{digit}
		</div>
	{/each}
</div>

<div class="min-h-screen flex justify-center items-center relative p-3">
	<div class="max-w-md w-full mx-auto rounded-xl p-5 shadow-xl bg-base-100">
		<div class="text-center flex flex-col gap-2 items-center mb-3">
			<h1 class="text-7xl tracking-wider mb-2 opacity-70">{"{}"}</h1>
			<h2 class="text-4xl font-light opacity-70">Codec</h2>
		</div>

		<div class="flex flex-col gap-3">
			<a href="/api/auth/google" class="btn md:grow w-full">
				<Icon icon="Google" class="w-5"/>
				Continue with Google
			</a>
			<a href="/api/auth/google" class="btn btn-outline w-full">
				<Icon icon="ArrowLeft" class="w-5"/>
				Back to Home
			</a>
		</div>
	</div>
</div>
