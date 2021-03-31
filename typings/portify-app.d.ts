interface SessionRequestAuthorise {
	code: string;
	grant_type: "authorization_code";
}

interface SessionRequestRefresh {
	refresh_token: string;
	grant_type: "refresh_token";
}

export type SessionRequestData =
	| SessionRequestAuthorise
	| SessionRequestRefresh;

export interface Session {
	access_token: string;
	refresh_token: string;
	user: Record<string, string>;
}

interface Dict {
	[key: string]: unknown;
}

interface RequestConfig {
	url: string;
	headers: {
		"Content-Type": string;
		Authorization: string;
	};
}

type BuildRequest = (path: string, params?: Dict | undefined) => RequestConfig;

type RequestHandler = (
	fn: (req: Architect.HttpRequest) => any,
	type: "html" | "json"
) => Architect.HttpHandler;


export as namespace PortifyApp;
