<script lang="ts">
	import { onMount } from 'svelte';
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import { fade } from "svelte/transition";
    import type { Writable } from 'svelte/store';

    import { ChevronRight, Image } from "lucide-svelte";

    import { Button } from "$lib/components/ui/button";
    import { pushState } from '$app/navigation';
    import * as Table from "$lib/components/ui/table";
    import { Badge } from "$lib/components/ui/badge";

    import Badges from "$lib/components/badges.svelte";

    import { users, incomplete } from "data/devnet-directory";

    import IntersectionObserver from "svelte-intersection-observer";
    
    let selected = "";
    let end = 100;
    let mounted = false;
    let intersecting = false;
    let element: HTMLDivElement;

    let sliced = users.slice(0, end);

    export let animate = true;
    export let directory: Writable<{
        rerender: () => void,
    }>

    $: isIncompleteUser = id && incomplete.find(({ wallet }) => id === wallet)
    $: id = $page.params.selected || "";

    function handleSelect() {
        selected = id;

        const selectedIdx = users?.findIndex(({ wallet }) => wallet === selected);

        if(selectedIdx > end) end = selectedIdx + 5;
        
        setTimeout(() => {
            const row = document.querySelector(`.id-${selected}`);

            row?.scrollIntoView({ block: "start", inline: "nearest" });
        }, 100);

        setTimeout(() => {
            selected = "";
        }, 4000);
    }

    function rerender() {
        mounted = false;

        setTimeout(() => {
            mounted = true;
            handleSelect();
        }, 10);
    }

    function loadMore() {
        if(end >= users.length - 1) {
            return console.log("no more users")
        };

        end += 100;
        sliced = users.slice(0, end);

    }

    $: if(intersecting) {
        console.log("loading more")
        loadMore();
    }

    $: console.log({sliced, end})

    onMount(() => {
        $directory.rerender = rerender;

        rerender();
    });
</script>

{#if mounted}
    <div
        class="p-3 w-full border rounded-lg"
        in:fade={animate ? {
            delay: 250,
            duration: 500,
        } : {}}
    >
        <Table.Root>
            <Table.Body>
                {#each sliced as {name, avatar, wallet, badges} (wallet)}
                    <Table.Row
                        class="cursor-pointer id-{wallet} {selected === wallet ? "bg-blue-100" : ""}"
                        on:click={() => goto(`/u/${wallet}`)}
                    >
                        <Table.Cell>
                            {#if avatar}
                                <img src={avatar} class="w-10 aspect-square object-cover rounded-full" alt="avatar" />
                            {:else}
                                <div class="w-10 aspect-square bg-gray-100 text-gray-400 p-1 rounded-full flex items-center justify-center">
                                    <Image class="w-full"/>
                                </div>
                            {/if}
                        </Table.Cell>
                        <Table.Cell class="text-gray-600">{name}</Table.Cell>
                        <Table.Cell>
                            <Badges {badges} /> 
                        </Table.Cell>
                        <Table.Cell>
                            <ChevronRight class="text-gray-600 w-4"/>
                        </Table.Cell>
                    </Table.Row>
                {/each}

                {#if end >= users.length - 1 || isIncompleteUser}
                    {#each incomplete as { wallet, badges, devlist }}
                        <Table.Row
                            class=" id-{wallet} {selected === wallet ? "bg-blue-100" : ""}"
                            on:click={() => wallet ? goto(`/u/${wallet}`) : null}
                        >
                            <Table.Cell>
                                <div id={wallet} class="w-10 aspect-square bg-gray-100 text-gray-400 p-1 rounded-full flex items-center justify-center">
                                    <Image class="w-full"/>
                                </div>
                            </Table.Cell>
                            <Table.Cell class="text-gray-600">
                                {devlist || wallet}
                            </Table.Cell>
                            <Table.Cell class="flex gap-2">
                                {#each badges || [] as badge}
                                    <Badge variant="outline">{badge}</Badge>
                                {/each}
                            </Table.Cell>
                            <Table.Cell>
                                {#if wallet}
                                    <ChevronRight class="text-gray-600 w-4"/>
                                {/if}
                            </Table.Cell>
                        </Table.Row>
                    {/each}
                {/if}
            </Table.Body>
        </Table.Root>

        <IntersectionObserver
            {element}
            bind:intersecting
        >
            <div bind:this={element} class="w-full py-10"/>
        </IntersectionObserver>
    </div>
{/if}