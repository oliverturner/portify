/**
 * @typedef {import("@architect/functions").HttpRequest} HttpRequest
 * @typedef {import("@architect/functions").HttpHandler} HttpHandler
 * @typedef {import("@architect/functions/http").SessionData} SessionData
 */

const { http } = require("@architect/functions");
const { get } = require("tiny-json-http");

const { makeResponse } = require("@architect/shared/make-response");
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
 * @param {Portify.MakeRequest} makeRequest
 * @param {Portify.Dict} params
 */
async function getTracks(makeRequest, params) {
	const trackRequest = makeRequest("/me/top/tracks", params);
	const topTrackRes = (await get(trackRequest)).body;

	/** @type {Record<string, Portify.TrackItem>} */
	const trackItemDict = {};
	for (const item of topTrackRes.items) {
		trackItemDict[item.id] = processTrackItem(item);
	}

	const trackItemIds = Object.keys(trackItemDict);
	const audioRequest = makeRequest("/audio-features", { ids: trackItemIds });
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
 * @param {HttpRequest} req
 */
async function getTop({ session, queryStringParameters }) {
	const time_range = getTimeRange(queryStringParameters.time_range);
	const limit = Number(queryStringParameters.limit) || LIMIT;

	const makeRequest = requestFactory(process.env, session);
	const tracks = await getTracks(makeRequest, { time_range, limit });

	return {
		session,
		status: 200,
		body: JSON.stringify(tracks),
	};
}

module.exports = {
	TIME_RANGE,
	LIMIT,
	getTop,
	handler: http.async(makeResponse(getTop)),
};
