export type TimeRange = "short_term" | "medium_term" | "long_term";

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
	artist: ArtistFull;
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

export as namespace PortifyApi;
