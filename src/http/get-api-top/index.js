/**
 * @typedef {import("@architect/functions").HttpRequest} HttpRequest
 * @typedef {import("@architect/functions").HttpHandler} HttpHandler
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
 * @type {HttpHandler}
 */
const getTop = async (req) => {
	const { limit = LIMIT, time_range = TIME_RANGE } =
		req.queryStringParameters || {};
	const getRequest = requestFactory(process.env, req.session);

	try {
		const trackRequest = getRequest("/me/top/tracks", { time_range, limit });
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
