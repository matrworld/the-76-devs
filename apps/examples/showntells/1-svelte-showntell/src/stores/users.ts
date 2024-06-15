import { writable } from "svelte/store";

export const users = writable<string[]>([]);
export const newUser = writable<string>("");