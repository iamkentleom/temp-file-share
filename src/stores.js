import { writable } from "svelte/store";
import { nanoid } from "nanoid";

export const files = writable([]);
export const downloadFilesMeta = writable([]);
export const values = writable();
export const toastState = writable(false);
export const folder = writable(nanoid(12));
