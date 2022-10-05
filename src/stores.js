import { writable } from "svelte/store";

export const files = writable([]);
export const values = writable();
export const toastState = writable(false);
