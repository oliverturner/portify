import { writable } from "svelte/store";

export const user = writable({});

export const playlists = writable({ items: [] });
