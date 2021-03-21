/**
 * @typedef {SpotifyApi.PagingObject<SpotifyApi.PlaylistTrackObject>} Page
 */

const { get } = require("tiny-json-http");

const { requestFactory, getPrevNext, buildDict } = require("../shared/utils");
const { convertTrackObject, isCollection } = require("../shared/spotify");
const { getPagingParams } = require("../shared/parse-query-params");
const { injectAudio } = require("../shared/audio");

/**
 * @param {string} playlistId
 * @param {string} name
 * @param {Page} tracks
 */
function processResponse(playlistId, name, tracks) {
	const { next, previous, limit, offset, total } = tracks;
	const processUrl = getPrevNext(`/api/playlist/${playlistId}`);

	return {
		id: playlistId,
		name,
		items: [],
		total,
		limit,
		offset,
		next: processUrl(next),
		prev: processUrl(previous),
	};
}

/**
 * @param {Architect.HttpRequest} req
 *
 * @returns {Promise<PortifyApi.PlaylistTracksPage>}
 */
async function getPlaylist({ session, pathParameters, queryStringParameters }) {
	const { playlistId } = pathParameters;
	const { limit, offset } = getPagingParams(queryStringParameters);

	const params = {
		market: "from_token",
		fields:
			"name,tracks(limit,next,offset,previous,total,items(track(id,name,is_playable,duration_ms,artists(id,name),album(id,name,images))))",
		limit,
		offset,
	};
	const buildRequest = requestFactory(process.env, session);
	const apiReq = buildRequest(`/playlists/${playlistId}`, params);

	/** @type {SpotifyApi.PlaylistObjectFull} */
	const { name, tracks } = (await get(apiReq)).body;
	const pagingObject = processResponse(playlistId, name, tracks);

	const itemTracks = tracks.items.map(({ track }) => track);
	const trackDict = buildDict(itemTracks, convertTrackObject);
	const audioTrackDict = await injectAudio(trackDict, buildRequest);

	return {
		...pagingObject,
		items: Object.values(audioTrackDict),
		isCollection: isCollection(itemTracks),
	};
}

module.exports = {
	getPlaylist,
};
