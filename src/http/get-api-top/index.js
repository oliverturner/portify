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
	const apiReq = buildRequest("/me/top/tracks", params);
	const apiRes = (await get(apiReq)).body;

	/** @type {Record<string, PortifyApi.TrackItemBase>} */
	const itemDict = buildDict(apiRes.items, convertTrackObject);
	const enhancedDict = await injectAudio(itemDict, buildRequest);

	// TODO: paginate response
	return {
		items: Object.values(enhancedDict),
	};
}

module.exports = {
	getTop,
	handler: http.async(makeResponse(getTop)),
};
