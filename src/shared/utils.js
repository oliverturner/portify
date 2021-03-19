/**
 * @typedef {import("@architect/functions/http").SessionData} SessionData
 */

/**
 * @param {{
 *   base: string;
 *   path: string;
 *   prefix?: string;
 *   params?: Record<string, unknown>;
 * }} params
 *
 * @returns {string}
 */
function buildUrl({ base, path, prefix = "", params = {} }) {
	const url = new URL(`${prefix}${path}`, base);

	for (const [key, val] of Object.entries(params)) {
		url.searchParams.set(key, String(val));
	}

	return url.toString();
}

/**
 * @param {NodeJS.ProcessEnv} envVars
 * @param {string} path
 * @param {Record<string, unknown>} [params]
 * @returns {string}
 */
function getApiUrl(envVars, path, params) {
	const {
		SPOTIFY_API_URL: base = "",
		SPOTIFY_API_VERSION: prefix = "",
	} = envVars;

	return buildUrl({ base, prefix, path, params });
}

/**
 * `requestFactory` produces a reusable function that returns an object that 
 * tiny-json-http can use to make an authenticated request
 *
 * Usage:
 *  const buildRequest = requestFactory(process.env, session);
 *  const apiReq = buildRequest("/me/top/tracks", { time_range, limit });
 *  const apiRes = (await get(apiReq)).body;
 *
 * @param {NodeJS.ProcessEnv} envVars
 * @param {SessionData} session
 */
function requestFactory(envVars, session = {}) {
	const { access_token } = session;

	/**
	 * @param {string} path
	 * @param {Record<string, unknown>} [params]
	 */
	function getRequestConfig(path, params) {
		return {
			url: getApiUrl(envVars, path, params),
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${access_token}`,
			},
		};
	}

	return getRequestConfig;
}

/**
 * Only retain the properties specified by `keys` in an object
 *
 * @param {Record<string, unknown>} target
 * @param {string[]} [keys]
 *
 * @returns {Record<string, unknown>}
 */
function filterProps(target, keys = []) {
	if (keys.length === 0) return target;

	/** @type {Record<string, unknown>} */
	const filtered = {};
	for (const key of keys) {
		if (key in target) {
			filtered[key] = target[key];
		}
	}

	return filtered;
}

/**
 * @template {{id:string}} T
 * @template {any} U
 * @param {T[]} items
 * @param {(item: T) => U} processorFn
 */
function buildDict(items, processorFn) {
	/** @type {Record<string, U>} */
	const dict = {};
	for (const item of items) {
		dict[item.id] = processorFn(item);
	}

	return dict;
}

/**
 * @type {(endpoint: string) => (rawUrl: string|null) => string|null}
 */
const getPrevNext = (endpoint) => (rawUrl) => {
	if (!rawUrl) return null;

	const url = new URL(rawUrl);
	const offset = url.searchParams.get("offset");
	const limit = url.searchParams.get("limit");

	return `${endpoint}?offset=${offset}&limit=${limit}`;
};

module.exports = {
	buildUrl,
	getApiUrl,
	requestFactory,
	filterProps,
	buildDict,
	getPrevNext,
};
