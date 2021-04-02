import { Writable } from "svelte/store";
import { Page } from "./portify-api";

export type User = Writable<?PortifyApi.User>;
export type Playlists = Writable<?Page<PortifyApi.Playlist>>;

export type TopTracks = Writable<?Page<PortifyApi.TrackItem>>;
export type Album = Writable<?PortifyApi.Album>;
export type Artist = Writable<?PortifyApi.Artist>;
export type Playlist = Writable<?PortifyApi.Playlist>;

export as namespace PortifyStores;
