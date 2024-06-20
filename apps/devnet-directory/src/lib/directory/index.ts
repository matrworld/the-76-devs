import { writable } from "svelte/store";

export const directory = writable<{
    rerender: () => void
}>({
    rerender() {}
});