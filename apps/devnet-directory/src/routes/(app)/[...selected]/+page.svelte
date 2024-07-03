<script lang="ts">
	import { onMount } from "svelte";
    import { directory } from '$lib/directory';
    import Nav from "$lib/components/nav.svelte";

    onMount(() => {        
        $directory.rerender()
    })
</script>

<Nav />