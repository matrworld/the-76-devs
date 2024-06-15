<script lang="ts">
    import Card from "./components/card.svelte";
    import { fly } from "svelte/transition";

    import { users, newUser } from "./stores/users";
    
    const sourceCards = [
        {
            title: "Card 1",
            description: "Card 1 Description",
            image: "https://images.pexels.com/photos/18592820/pexels-photo-18592820/free-photo-of-a-sunflower-in-a-field-with-a-blue-sky.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            title: "Card 2",
            description: "Card 2 Description",
            image: "https://images.pexels.com/photos/20217895/pexels-photo-20217895/free-photo-of-an-older-man-is-cutting-wood-with-a-chainsaw.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            title: "Card 3",
            description: "Card 3 Description",
            image: "https://images.pexels.com/photos/19293967/pexels-photo-19293967/free-photo-of-person-with-jar-of-jam-by-pile-of-homemade-racuchy-pancakes.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }, 
        {
            title: "Card 4",
            description: "Card 4 Description",
            image: "https://images.pexels.com/photos/20309247/pexels-photo-20309247/free-photo-of-waterfall.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }
    ];

    let cards = [];
    let showCards = true;
    
    const addUser = () => {
        $users.push($newUser);
        $newUser = "";
        $users = $users;
    }

    const pickRandomItemFromArray = (arr: any[]) => {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    const addRandomCard = () => {
        cards.push(pickRandomItemFromArray(sourceCards));

        cards = cards;
    }
</script>

<nav class="top-0 sticky bg-black bg-opacity-30 p-2 flex justify-between items-center">
    <h2>Nav</h2>

    <div>
        <button class="btn btn-primary">My Button</button>
    </div>
</nav>

<main class="p-5">
    <section class="flex items-center justify-center min-h-[40vh]">
        <h1 class="font-bold text-5xl">Svelte Demo</h1>
    </section>

    <section class="my-5">
        <div>
            <h3>Create User</h3>
            <div class="flex gap-3">
                <input
                    type="text"
                    placeholder="Name"
                    class="input input-text input-bordered"
                    bind:value={$newUser}
                >
                <div>
                    <button class="btn" on:click={addUser}>
                        Add
                    </button>
                </div>
            </div>
            <div>
                <ul>
                    {#each $users as user}
                        <li>{user}</li>
                    {/each}
                </ul>
            </div>
        </div>
    </section>

    <section>
        <div>
            <input
                id="showCards"
                type="checkbox"
                bind:checked={showCards}
            />
            <label for="showCards">Show Cards</label>
        </div>

        {#if showCards}
            {#if cards.length < 10}
                <button class="btn btn-primary mb-3" on:click={addRandomCard}>Add Card</button>
            {/if}

            <div class="flex flex-wrap gap-3 w-full">
                {#each cards as card}
                    <div class="w-[8rem]"
                        transition:fly={{
                            y: 100,
                            duration: 500
                        }}
                    >
                        <Card
                            {...card}
                            user={pickRandomItemFromArray($users)}
                        />
                    </div>
                {/each}
            </div>
        {/if}
    </section>
</main>