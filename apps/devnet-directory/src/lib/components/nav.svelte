<script>
	import { onMount } from "svelte";
    import { fly } from "svelte/transition";

    import { VerifiedIcon } from "lucide-svelte";

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
        <h1 class="text-xl font-semibold">76 | Directory</h1>
        <div class="flex items-center gap-1">
            <VerifiedIcon class="w-3 text-gray-600"/>
            <p class="text-gray-600 text-xs">Record of community verified developers.</p>
        </div>
    </div>
{/if}