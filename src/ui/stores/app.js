import { writable } from "svelte/store";

/** @type {PortifyStores.User} */
export const user = writable(null);

/** @type {PortifyStores.Options} */
export const options = writable(null);

/** @type {import("@typings/portify-stores").Playlists} */
export const playlists = writable(null);
