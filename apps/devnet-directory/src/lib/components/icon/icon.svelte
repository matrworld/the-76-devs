<script lang="ts">
    import { icons, type IconName, type IconSize } from "$lib/components/icon";
    import { browser } from "$app/environment";

    export let icon: IconName;
    export let size: IconSize = "sm";

    const sizes = {
        sm: 14,
        md: 18,
        lg: 32,
    }

    $: props = {
        size: sizes[size],
        class: `${$$props.class} aspect-square w-[${sizes[size]}px]`
    }
</script>

{#if icons[icon] && browser}
    <svelte:component
        this={icons[icon]}
        {...$$props}
        {...props}
    />
{/if}

