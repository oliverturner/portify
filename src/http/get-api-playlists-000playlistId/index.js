/**
 * @typedef {import("@architect/functions").HttpRequest} HttpRequest
 * @typedef {SpotifyApi.PagingObject<SpotifyApi.PlaylistTrackObject>} Page
 */

const { http } = require("@architect/functions");
const { get } = require("tiny-json-http");

const { makeResponse } = require("@architect/shared/make-response");
const { requestFactory, getPrevNext } = require("@architect/shared/utils");
const { getPagingParams } = require("@architect/shared/parse-query-params");

/**
 * @param {SpotifyApi.ImageObject[]} rawImages
 */
function processImages(rawImages) {
	/** @type Record<string, string> */
	const images = {};
	for (const { width, url } of rawImages) {
		images[String(width)] = url;
	}

	return images;
}

/**
 * @param {{track:SpotifyApi.TrackObjectFull}[]} rawItems
 */
function processItems(rawItems) {
	const items = [];
	for (const { track } of rawItems) {
		const { id, name, artists, album, duration_ms, is_playable } = track;

		items.push({
			id,
			name,
			artists,
			duration_ms,
			is_playable,
			href: `/albums/${album.id}`,
			images: processImages(album.images),
		});
	}

	return items;
}

/**
 * @param {string} playlistId
 * @param {SpotifyApi.PlaylistObjectFull} page
 */
function processResponse(playlistId, { id, name, tracks }) {
	const { items, next, previous, limit, offset, total } = tracks;

	const processUrl = getPrevNext(`/api/playlist/${playlistId}`);

	return {
		id,
		name,
		items: processItems(items),
		next: processUrl(next),
		prev: processUrl(previous),
		limit,
		offset,
		total,
	};
}

/**
 * @param {HttpRequest} req
 */
async function getPlaylist({
	session,
	pathParameters,
	queryStringParameters,
}) {
	const { playlistId } = pathParameters;
	const { limit, offset } = getPagingParams(queryStringParameters);

	const params = {
		market: "from_token",
		fields:
			"id,name,tracks(limit,next,offset,previous,total,items(track(id,name,is_playable,duration_ms,artists(id,name),album(id,name,images))))",
		limit,
		offset,
	};
	const buildRequest = requestFactory(process.env, session);
	const playlistReq = buildRequest(`/playlists/${playlistId}`, params);

	const playlistRes = (await get(playlistReq)).body;
	const pagingObject = processResponse(playlistId, playlistRes);

	// TODO: add audio
	// TODO: indicate whether playlist is a collection (eg DJ mix)

	return pagingObject;
}

module.exports = {
	getPlaylist,
	handler: http.async(makeResponse(getPlaylist)),
};
