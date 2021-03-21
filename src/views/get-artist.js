/**
 * @typedef {SpotifyApi.ArtistObjectFull} ArtistObjectFull
 * @typedef {SpotifyApi.PagingObject<SpotifyApi.AlbumObjectSimplified>} AlbumPage
 * @typedef {SpotifyApi.TrackObjectFull} TrackObjectFull
 */

const { get } = require("tiny-json-http");
const { requestFactory } = require("../shared/utils");
const parsers = require("./get-artist-parsers");

/**
 * @param {PortifyApp.BuildRequest} buildRequest
 * @param {string} artistId
 */
function getBio(buildRequest, artistId) {
	return {
		req: buildRequest(`/artists/${artistId}`),
		fn: parsers.processArtist,
	};
}

/**
 * @param {PortifyApp.BuildRequest} buildRequest
 * @param {string} artistId
 */
function getAlbums(buildRequest, artistId) {
	return {
		req: buildRequest(`/artists/${artistId}/albums`, {
			include_groups: "appears_on",
			market: "from_token",
			limit: 10,
		}),
		fn: parsers.processAlbums,
	};
}

/**
 * @param {PortifyApp.BuildRequest} buildRequest
 * @param {string} artistId
 */
function getTopTracks(buildRequest, artistId) {
	return {
		req: buildRequest(`/artists/${artistId}/top-tracks`, {
			market: "from_token",
			limit: 10,
		}),
		fn: parsers.processTopTracks,
	};
}

/**
 * @param {PortifyApp.BuildRequest} buildRequest
 * @param {string} artistId
 */
function getRelatedArtists(buildRequest, artistId) {
	return {
		req: buildRequest(`/artists/${artistId}/related-artists`),
		fn: parsers.processRelatedArtists,
	};
}

/**
 * Produce an object that matches the shape of requests
 *
 * @param {Record<string, {req:PortifyApp.RequestConfig, fn: Function}>} requests
 */
async function processRequests(requests) {
	const promises = Object.entries(requests).map(async ([key, { req, fn }]) => {
		const { body } = await get(req);
		return [key, fn(body)];
	});

	return Object.fromEntries(await Promise.all(promises));
}

/**
 * @param {Architect.HttpRequest} req
 * @returns {Promise<PortifyApi.ArtistResponse>}
 */
async function getArtist({ session, pathParameters }) {
	const { artistId } = pathParameters;
	const buildRequest = requestFactory(process.env, session);

	return processRequests({
		bio: getBio(buildRequest, artistId),
		appearsOn: getAlbums(buildRequest, artistId),
		topTracks: getTopTracks(buildRequest, artistId),
		relatedArtists: getRelatedArtists(buildRequest, artistId),
	});
}

module.exports = {
	getArtist,
};
