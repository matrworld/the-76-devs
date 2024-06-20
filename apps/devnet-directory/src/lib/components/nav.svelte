<script>
	import { onMount } from "svelte";
    import { fly } from "svelte/transition";

    let ready = false;

    export let animate = true;

    onMount(() => {
        ready = true;
    })
</script>

{#if ready}
    <div
        class="py-3"
        in:fly={{
            delay: animate ? 1500 : 0,
            duration: animate ? 750 : 0,
            y: animate ? -10 : 0,
        }}
    >
        <h1 class="text-xl font-semibold">Devnet Directory</h1>
        <p class="text-gray-600 text-xs">Record of community trusted developers.</p>
    </div>
{/if}