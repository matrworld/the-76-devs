<script>
    export let title = "Card Title";
    export let description = "Card Description";
    export let image = "https://via.placeholder.com/150";
    export let user = "";
</script>

<div
    class="rounded overflow-hidden border aspect-[3/4] bg-cover bg-center flex flex-col justify-end"
    style:background-image="url({image})"
>
    <div class="bg-black bg-opacity-30 p-1">
        <h3 class="font-semibold">
            {title}
        </h3>
        <p class="text-xs">
            {description}
        </p>
        <p class="text-xs">
            User: {user}
        </p>
    </div>
</div>