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
	is_playable: boolean;
	artists: TrackItemArtist[];
	audio?: TrackItemAudio;
	playLink?: string;
	href?: string;
	images?: Record<string, string>;
}

export interface TrackItem extends TrackItemBase {
	href: string;
	images: Record<string, string>;
}

interface SessionRquestAuthorise {
	code: string;
	grant_type: "authorization_code";
}

interface SessionRquestRefresh {
	refresh_token: string;
	grant_type: "refresh_token";
}

export type SessionRequestData = SessionRquestAuthorise | SessionRquestRefresh;

export interface Session {
	access_token: string;
	refresh_token: string;
	user: Record<string, string>;
}

interface Dict {
	[key: string]: unknown;
}

type MakeRequest = (
	path: string,
	params?: Dict | undefined
) => {
	url: string;
	headers: {
		"Content-Type": string;
		Authorization: string;
	};
};

export as namespace Portify;
