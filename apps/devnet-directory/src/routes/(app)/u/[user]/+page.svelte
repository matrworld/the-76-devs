<script>
	import { goto } from "$app/navigation";
    import { page } from "$app/stores";

    import Badges from "$lib/components/badges.svelte";

    import * as Dialog from "$lib/components/ui/dialog";
    import { users, incomplete } from "data/devnet-directory";
	import { Icon } from "$lib/components/icon";

    let open = true;

    $: user = [
        ...users,
        ...incomplete
    ]?.find(({ wallet }) => wallet === $page.params.user);

    $: if(!open) {
        goto(`/${$page.params.user}`);
    }
</script>

<Dialog.Root bind:open>
    <Dialog.Content class="sm:max-w-[425px] max-h-[90vh] overflow-auto">
        <Dialog.Header>            
            <img
                src={user?.avatar}
                class="mx-auto w-1/2 aspect-square rounded-full"
                alt=""
            />
            
            <Dialog.Description>
                <div class="my-3">
                    <h2 class="font-semibold text-xl">
                        {user?.name}
                    </h2>
                    <p>
                        {user?.bio}
                    </p>
                </div>

                <div>
                    <Badges badges={user?.badges} />
                </div>

                <div class="flex flex-col w-full gap-3 my-3">
                    <a
                        href="https://solana.fm/address/{user?.wallet}/transactions"
                        class="bg-gray-100 hover:bg-gray-300 rounded-lg p-3 flex items-center gap-3 w-full"
                        target="_blank"
                    >
                        <div class="w-5 flex justify-center">
                            <Icon icon="Wallet" class="stroke-gray-500 w-4" />
                        </div>
                        
                        <p class="text-xs">
                            {user?.wallet?.substring(0, 8)}...{user?.wallet?.substring(user?.wallet?.length - 8)}
                        </p>
                    </a>

                    {#if user?.x}
                        <a
                            href="https://x.com/{user?.x}"
                            class="bg-gray-100 hover:bg-gray-300 rounded-lg p-3 flex items-center gap-3 w-full"
                            target="_blank"
                        > 
                            <div class="w-5 flex justify-center">
                                <Icon icon="Twitter" class="w-3 stroke-gray-600 opacity-50" />
                            </div>
                            <p>
                                @{user?.x}
                            </p>
                        </a>
                    {/if}

                    {#if user?.github}
                        <a
                            href="https://github.com/{user?.github}"
                            class="bg-gray-100 hover:bg-gray-300 rounded-lg p-3 flex items-center gap-3 w-full"
                            target="_blank"
                        >
                            <div class="w-5 flex justify-center">
                                <Icon icon="Github" class="w-4 fill-gray-500" />
                            </div>
                            <p>
                                {user?.github}
                            </p>
                        </a>
                    {/if}
                   
                    {#if user?.discord}
                        <a
                            href="/"
                            class="bg-gray-100 pointer-events-none rounded-lg p-3 flex items-center gap-3 w-full"
                            target="_blank"
                        >   
                            <div class="w-5 flex justify-center">
                                <Icon icon="Discord" class="w-4 fill-gray-500" />
                            </div>
                            <p>
                                {user?.discord}
                            </p>
                        </a>
                    {/if}
                </div>
            </Dialog.Description>
        </Dialog.Header>
        <Dialog.Footer>
            <!-- <Button type="submit">Save changes</Button> -->
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>