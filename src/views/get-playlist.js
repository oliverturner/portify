/**
 * @typedef {SpotifyApi.PagingObject<SpotifyApi.PlaylistTrackObject>} Page
 * @typedef {import("@architect/functions").HttpRequest} HttpRequest
 */

const { get } = require("tiny-json-http");

const { requestFactory, getPrevNext, buildDict } = require("../shared/utils");
const { getPagingParams } = require("../shared/parse-query-params");
const { injectAudio } = require("../shared/audio");
const spotify = require("../shared/spotify");

/**
 * @param {string} id
 * @param {string} name
 * @param {Page} tracks
 */
function processResponse(id, name, tracks) {
	const { next, previous, limit, offset, total } = tracks;
	const processUrl = getPrevNext(`/api/playlist/${id}`);

	return {
		id,
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
 *
 * @param {SpotifyApi.ImageObject[]} images
 * @param {PortifyApi.TrackItemBase[]} items
 *
 * @returns {string | undefined}
 */
function getCoverImage(images = [], items) {
	return (
		(images[0] && images[0].url) ||
		(items[0] && items[0].images && items[0].images["300"])
	);
}

/**
 * @param {HttpRequest} req
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
	const { name, tracks, images } = (await get(apiReq)).body;
	const pagingObject = processResponse(playlistId, name, tracks);

	const itemTracks = tracks.items.map(({ track }) => track);
	const trackDict = buildDict(itemTracks, spotify.convertTrackObject);
	const audioTrackDict = await injectAudio(trackDict, buildRequest);
	const items = Object.values(audioTrackDict);

	const isCollection = spotify.playlistIsCollection(itemTracks);
	const imageUrl = isCollection ? getCoverImage(images, items) : undefined;

	return {
		...pagingObject,
		items,
		imageUrl,
		isCollection,
	};
}

module.exports = {
	getPlaylist,
};
