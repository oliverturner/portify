/**
 * @typedef {import("@architect/functions").HttpRequest} HttpRequest
 * @typedef {import("@architect/functions").HttpHandler} HttpHandler
 * @typedef {import("@architect/functions/http").SessionData} SessionData
 *
 * @typedef {import("@typings/app").TrackItem} TrackItem
 * @typedef {import("@typings/app").TrackItemAudio} TrackItemAudio
 * @typedef {import("@typings/app").TimeRange} TimeRange
 */

const { http } = require("@architect/functions");
const { get } = require("tiny-json-http");

const { requestFactory } = require("@architect/shared/utils");
const { addTrackAudio } = require("@architect/shared/audio");

/** @type {TimeRange} */
const TIME_RANGE = "short_term";
const LIMIT = 48;

/**
 * @param {SpotifyApi.TrackObjectFull} item
 * @returns {TrackItem}
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

	/** @type {Record<string, TrackItem>} */
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
 * @type {HttpHandler}
 */
const getTop = async (req) => {
	const time_range = getTimeRange(req.queryStringParameters.time_range);
	const limit = Number(req.queryStringParameters.limit) || LIMIT;

	async function respond() {
		const tracks = await getTracks({
			session: req.session,
			params: { time_range, limit },
		});
		return {
			status: 200,
			body: JSON.stringify(tracks),
		};
	}

	try {
		return await respond();
	} catch (error) {
		return error;
	}
};

module.exports = {
	TIME_RANGE,
	LIMIT,
	getTop,
	handler: http.async(getTop),
};
