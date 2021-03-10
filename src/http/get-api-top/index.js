/**
 * @typedef {import("@architect/functions").HttpRequest} HttpRequest
 * @typedef {import("@architect/functions").HttpHandler} HttpHandler
 * @typedef {import("@architect/functions/http").SessionData} SessionData
 */

const { http } = require("@architect/functions");
const { get, post } = require("tiny-json-http");

const {
	makeSessionRequest,
	getLogoutResponse,
} = require("@architect/shared/session-request");
const { requestFactory } = require("@architect/shared/utils");
const { addTrackAudio } = require("@architect/shared/audio");

/** @type {Portify.TimeRange} */
const TIME_RANGE = "short_term";
const LIMIT = 48;

/**
 * @param {SpotifyApi.TrackObjectFull} item
 * @returns {Portify.TrackItem}
 */
function processTrackItem(item) {
	const { artists: artistsRaw, id, name } = item;
	const artists = artistsRaw.map(({ id, name }) => ({ id, name }));

	return { id, artists, name };
}

/**
 * @param {{
 *   session?: SessionData,
 *   params: { time_range: string, limit: number }
 * }} args
 */
async function getTracks({ session, params }) {
	const getRequest = requestFactory(process.env, session);
	const trackRequest = getRequest("/me/top/tracks", params);
	const topTrackRes = (await get(trackRequest)).body;

	/** @type {Record<string, Portify.TrackItem>} */
	const trackItemDict = {};
	for (const item of topTrackRes.items) {
		trackItemDict[item.id] = processTrackItem(item);
	}

	const trackItemIds = Object.keys(trackItemDict);
	const audioRequest = getRequest("/audio-features", { ids: trackItemIds });
	const tracks = await addTrackAudio(trackItemDict, audioRequest);

	return tracks;
}

/**
 * @param {string} range
 */
function getTimeRange(range) {
	const ranges = ["short_term", "medium_term", "long_term"];
	return ranges.includes(range) ? range : TIME_RANGE;
}

/**
 * @param {{
 *   session?: SessionData,
 *   queryStringParameters: {[key: string]: string}
 * }} args
 */
async function respond({ session, queryStringParameters }) {
	const time_range = getTimeRange(queryStringParameters.time_range);
	const limit = Number(queryStringParameters.limit) || LIMIT;

	const tracks = await getTracks({ session, params: { time_range, limit } });

	return {
		session,
		status: 200,
		body: JSON.stringify(tracks),
	};
}

/**
 * @type {HttpHandler}
 */
const getTop = async (req) => {
	try {
		return await respond(req);
	} catch (error) {
		if (!req.session) {
			return getLogoutResponse();
		}

		if (error.statusCode === 401) {
			try {
				const refreshReq = makeSessionRequest(process.env, {
					refresh_token: req.session.refresh_token,
					grant_type: "refresh_token",
				});
				const { access_token } = (await post(refreshReq)).body;
				req.session.access_token = access_token;
				return await respond(req);
			} catch (error) {
				return getLogoutResponse();
			}
		}

		return error;
	}
};

module.exports = {
	TIME_RANGE,
	LIMIT,
	getTop,
	handler: http.async(getTop),
};
