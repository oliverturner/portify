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

export interface TrackItem {
	id: string;
	name: string;
	artists: TrackItemArtist[];
	audio?: TrackItemAudio;
}

interface SessionRquestAuthorise {
	code: string;
	grant_type: "authorization_code";
}

interface SessionRquestRefresh {
	refresh_token: string;
	grant_type: "refresh_token";
}

export type SessionRequestData = SessionRquestAuthorise | SessionRquestRefresh

export interface Session {
	access_token: string;
	refresh_token: string;
	user: Record<string, string>;
}

export as namespace Portify;
