const { http } = require("@architect/functions");
const { get } = require("tiny-json-http");

const parseQuery = require("@architect/shared/parse-query-params");
const { injectAudio } = require("@architect/shared/audio");
const { convertTrackObject } = require("@architect/shared/spotify");
const { onApiRequest } = require("@architect/shared/on-api-request");
const { requestFactory, buildDict } = require("@architect/shared/utils");

/**
 * @param {Architect.HttpRequest} req
 */
async function getData({ session, queryStringParameters }) {
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
	getData,
	handler: http.async(onApiRequest(getData)),
};
