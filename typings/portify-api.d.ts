import { RouteId } from "./portify-app";

export type TimeRange = "short_term" | "medium_term" | "long_term";

export interface Page<T> {
	items: T[];
	limit: number;
	offset: number;
	next: string | null;
	prev: string | null;
	total: number;
}

export interface PlaylistTracksPage extends Page<TrackItemBase> {
	id: string;
	name: string;
	isCollection: boolean;
}

export interface Playlist {
	id: string;
	name: string;
	description: string | null;
	href: string;
	imageUrl: string;
	ownerId: string;
	tracks: number;
}

export interface TrackItemArtist {
	id: string;
	name: string;
}

export interface TrackItemAudio {
	keys: {
		camelot: string;
		musical: string;
	};
	bpm: number;
	analysis_url: string;
}

export interface TrackItemBase {
	id: string;
	name: string;
	artists: TrackItemArtist[];
	href?: string;
	audio?: TrackItemAudio;
	images?: Record<string, string>;
	playLink?: string;
}
export interface TrackItem extends TrackItemBase {
	href: string;
	audio: TrackItemAudio;
	images: Record<string, string>;
	playLink: string;
}

export interface Artist {
	id: string;
	name: string;
	href: string;
}

export interface ArtistFull extends Artist {
	genres: string[];
	images: Record<string, string>;
}

export interface ArtistResponse {
	bio: ArtistFull;
	appearsOn: PortifyApi.Album[];
	topTracks: PortifyApi.TrackItemBase[];
	relatedArtists: PortifyApi.ArtistFull[];
}

export interface Album {
	id: string;
	name: string;
	href: string;
	release_date: string;
	album_type: "album" | "single" | "compilation";
	images: Record<string, string>;
	artists: Artist[];
}

export interface RouteDataGeneric {
	user: SpotifyApi.UserObjectPrivate;
	playlists: Page<Playlist>;
	routeId: RouteId;
	pageData: any
}

export interface RouteData<T> extends RouteDataGeneric {
	pageData: T;
}

export type FetchRouteData<T> = (
	req: Architect.HttpRequest,
	routeId: RouteId,
	pageDataFn: (req: Architect.HttpRequest) => Promise<T>
) => Promise<RouteData<T>>;

export interface User {
	id: string;
	display_name: string;
	product: string;
	imageUrl: string;
}

export as namespace PortifyApi;
