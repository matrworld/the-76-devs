<script lang="ts">
    import { Badge } from "$lib/components/ui/badge";

    export let badges;
</script>

<div class="flex flex-wrap items-center gap-2">
    {#if badges?.includes("devcard")}
        <Badge variant="outline" class="flex items-center">
            <div class="bg-green-400 w-2 aspect-square rounded-full mr-1"></div>
            verified
        </Badge>
    {/if}
    
    {#each badges || [] as badge}
        <Badge variant="outline" class="flex items-center">
            <div class="bg-gray-200 w-2 aspect-square rounded-full mr-1"></div>
            {badge}
        </Badge>
    {/each}
</div>