/**
 * @typedef {SpotifyApi.PagingObject<SpotifyApi.PlaylistObjectSimplified>} Page
 * @typedef {PortifyApi.Page<PortifyApi.Playlist>} PlaylistPage
 */

const { get } = require("tiny-json-http");
const { requestFactory, getPrevNext } = require("../shared/utils");
const { getPagingParams } = require("../shared/parse-query-params");

/**
 * @param {SpotifyApi.PlaylistObjectSimplified[]} rawItems
 */
function processItems(rawItems) {
	const items = [];
	for (const item of rawItems) {
		const { id, name, description, images, owner, tracks } = item;
		const imageUrl = images[0] && images[0].url;

		items.push({
			id,
			name,
			description,
			imageUrl,
			href: `/playlists/${id}`,
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
 * @param {Architect.HttpRequest} req
 *
 * @returns {Promise<PlaylistPage>}
 */
async function getPlaylists({ session, queryStringParameters }) {
	const params = getPagingParams(queryStringParameters);
	const buildRequest = requestFactory(process.env, session);
	const apiReq = buildRequest("/me/playlists", params);

	/** @type {Page} */
	const apiRes = (await get(apiReq)).body;
	const pagingObject = processResponse(apiRes);

	return pagingObject;
}

module.exports = {
	getPlaylists,
};
