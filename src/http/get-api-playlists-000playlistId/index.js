/**
 * @typedef {import("@architect/functions").HttpRequest} HttpRequest
 * @typedef {SpotifyApi.PagingObject<SpotifyApi.PlaylistTrackObject>} Page
 */

const { http } = require("@architect/functions");
const { get } = require("tiny-json-http");

const {
	requestFactory,
	getPrevNext,
	buildDict,
} = require("@architect/shared/utils");
const { makeResponse } = require("@architect/shared/make-response");
const { getPagingParams } = require("@architect/shared/parse-query-params");
const { convertTrackObject, isCollection } = require("@architect/shared/spotify");
const { injectAudio } = require("@architect/shared/audio");

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
 * @param {HttpRequest} req
 */
async function getData({ session, pathParameters, queryStringParameters }) {
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
	getData,
	handler: http.async(makeResponse(getData)),
};
