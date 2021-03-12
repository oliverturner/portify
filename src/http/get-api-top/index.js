/**
 * @typedef {import("@architect/functions").HttpRequest} HttpRequest
 */

const { http } = require("@architect/functions");
const { get } = require("tiny-json-http");

const { makeResponse } = require("@architect/shared/make-response");
const { requestFactory, buildDict } = require("@architect/shared/utils");

const { injectAudio } = require("@architect/shared/audio");
const { convertTrackObject } = require("@architect/shared/spotify");
const parseQuery = require("@architect/shared/parse-query-params");

/**
 * @param {HttpRequest} req
 */
async function getTop({ session, queryStringParameters }) {
	const params = {
		time_range: parseQuery.getTimeRange(queryStringParameters),
		limit: parseQuery.getLimit(queryStringParameters),
	};

	const buildRequest = requestFactory(process.env, session);
	const reqConfig = buildRequest("/me/top/tracks", params);
	const topTracks = (await get(reqConfig)).body;

	/** @type {Record<string, Portify.TrackItem>} */
	const topTrackDict = buildDict(topTracks.items, convertTrackObject);
	const audioTrackDict = await injectAudio(topTrackDict, buildRequest);

	return {
		session,
		status: 200,
		body: JSON.stringify(audioTrackDict),
	};
}

module.exports = {
	getTop,
	handler: http.async(makeResponse(getTop)),
};
