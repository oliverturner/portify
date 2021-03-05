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

export interface Session {
  access_token: string;
  refresh_token: string;
  user: Record<string, string>;
}

export as namespace Portify