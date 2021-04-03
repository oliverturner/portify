/**
 * @typedef {import("@typings/portify-stores").User} UserStore
 * @typedef {import("@typings/portify-stores").Options} OptionsStore
 * @typedef {import("@typings/portify-stores").Playlists} PlaylistsStore
 */

import { writable } from "svelte/store";

/** @type {UserStore} */
export const user = writable(null);

/** @type {OptionsStore} */
export const options = writable(null);

/** @type {PlaylistsStore} */
export const playlists = writable(null);
