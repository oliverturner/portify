/**
 * @typedef {import("@architect/functions").HttpRequest} HttpRequest
 * @typedef {SpotifyApi.PagingObject<SpotifyApi.PlaylistObjectSimplified>} Page
 */

const { http } = require("@architect/functions");
const { get } = require("tiny-json-http");

const { makeResponse } = require("@architect/shared/make-response");
const { requestFactory, getPrevNext } = require("@architect/shared/utils");
const { getPagingParams } = require("@architect/shared/parse-query-params");

/**
 * @param {SpotifyApi.PlaylistObjectSimplified[]} rawItems
 */
function processItems(rawItems) {
	const items = [];
	for (const item of rawItems) {
		const { id, name, description, images, owner, tracks } = item;

		items.push({
			id,
			name,
			description,
			href: `/playlists/${id}`,
			imageUrl: images[0].url,
			ownerId: owner.id,
			tracks: tracks.total,
		});
	}

	return items;
}

/**
 * @param {Page} page
 */
function processResponse({ items, next, previous, limit, offset, total }) {
	const processUrl = getPrevNext("/api/playlists");

	return {
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
async function getData({ session, queryStringParameters }) {
	const params = getPagingParams(queryStringParameters);
	const buildRequest = requestFactory(process.env, session);
	const apiReq = buildRequest("/me/playlists", params);

	/** @type {Page} */
	const apiRes = (await get(apiReq)).body;
	const pagingObject = processResponse(apiRes);

	return pagingObject;
}

module.exports = {
	getPlaylists: getData,
	handler: http.async(makeResponse(getData)),
};
