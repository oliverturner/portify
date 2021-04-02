/**
 * @typedef {import("@typings/portify-stores").User} UserStore
 * @typedef {import("@typings/portify-stores").Playlists} PlaylistsStore
 * @typedef {import("@typings/portify-stores").Album} AlbumStore
 * @typedef {import("@typings/portify-stores").Artist} ArtistStore
 * @typedef {import("@typings/portify-stores").Playlist} PlaylistStore
 * @typedef {import("@typings/portify-stores").TopTracks} TopTracksStore
 */

import { writable } from "svelte/store";

/** @type {UserStore} */
export const user = writable(null);

/** @type {PlaylistsStore} */
export const playlists = writable(null);

/** @type {AlbumStore} */
export const album = writable(null);

/** @type {ArtistStore} */
export const artist = writable(null);

/** @type {PlaylistStore} */
export const playlist = writable(null);

/** @type {TopTracksStore} */
export const toptracks = writable(null);
