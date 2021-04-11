import { writable } from "svelte/store";

/** @type {PortifyStores.Album} */
export const album = writable(null);

/** @type {PortifyStores.Artist} */
export const artist = writable(null);

/** @type {PortifyStores.Playlist} */
export const playlist = writable(null);

/** @type {PortifyStores.TopTracks} */
export const toptracks = writable(null);
