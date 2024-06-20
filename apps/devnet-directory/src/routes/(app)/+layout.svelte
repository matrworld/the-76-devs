<script lang="ts">
    import '$lib/styles/app.postcss';

    import { DirectoryTable } from '$lib/components/directory';
	import { onMount } from 'svelte';

    import { directory } from '$lib/directory';

    let ready = false;

    onMount(() => {
        ready = true;
    }); 
</script>

<div class="max-w-4xl w-full mx-auto">
    <slot></slot>

    <DirectoryTable {directory} /> 
</div>

