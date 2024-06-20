<script lang="ts">
    import { fade } from 'svelte/transition'
    import { notifications } from './notifications'
</script>
  

{#if $notifications}
    <div class="toast toast-top" style="z-index: 999;">
        {#each $notifications as notification}
            <div
                role="alert"
                class="alert alert-{notification.type}"
                transition:fade
            >
                <div>
                    <h2>{notification.title}</h2>
                    <p>{notification.message} </p>
                </div>
            </div>
        {/each}
    </div>
{/if}
