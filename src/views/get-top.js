const { get } = require("tiny-json-http");

const parseQuery = require("../shared/parse-query-params");
const { injectAudio } = require("../shared/audio");
const { convertTrackObject } = require("../shared/spotify");
const { requestFactory, buildDict } = require("../shared/utils");

/**
 * @param {Architect.HttpRequest} req
 *
 * @returns {Promise<PortifyApi.TopTracksPage>}
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
};
