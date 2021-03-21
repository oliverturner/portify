/**
 * @typedef {SpotifyApi.PagingObject<SpotifyApi.TrackObjectSimplified>} Page
 */

const { get } = require("tiny-json-http");

const { requestFactory, getPrevNext, buildDict } = require("../shared/utils");
const {
	convertImages,
	convertArtists,
	convertTrackObject,
} = require("../shared/spotify");
const { getPagingParams } = require("../shared/parse-query-params");
const { injectAudio } = require("../shared/audio");

/**
 * @param {string} albumId
 * @param {Page} tracks
 */
function processResponse(albumId, { next, previous, limit, offset, total }) {
	// TODO: pass processUrl as a parameter: need getPrevNext to include all additional searchParams
	const processUrl = getPrevNext(`/api/albums/${albumId}`);

	return {
		total,
		limit,
		offset,
		next: processUrl(next),
		prev: processUrl(previous),
	};
}

/**
 * @param {Architect.HttpRequest} req
 */
async function getAlbum({ session, pathParameters, queryStringParameters }) {
	const { albumId } = pathParameters;
	const { limit, offset } = getPagingParams(queryStringParameters);

	const params = { market: "from_token", limit, offset };
	const buildRequest = requestFactory(process.env, session);
	const apiReq = buildRequest(`/albums/${albumId}`, params);

	/** @type {SpotifyApi.AlbumObjectFull} */
	const {
		id,
		name,
		label,
		tracks,
		images,
		artists,
		album_type,
		external_ids,
		genres,
		release_date,
	} = (await get(apiReq)).body;
	const pagingObject = processResponse(albumId, tracks);

	const trackDict = buildDict(tracks.items, convertTrackObject);
	const audioTrackDict = await injectAudio(trackDict, buildRequest);

	return {
		id,
		name,
		label,
		album_type,
		external_ids,
		genres,
		release_date,
		artists: convertArtists(artists),
		images: convertImages(images),
		items: Object.values(audioTrackDict),
		...pagingObject,
	};
}

module.exports = {
	getAlbum,
};
