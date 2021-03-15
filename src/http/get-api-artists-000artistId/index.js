/**
 * @typedef {import("@architect/functions").HttpRequest} HttpRequest
 * @typedef {SpotifyApi.PagingObject<SpotifyApi.PlaylistObjectSimplified>} Page
 */

const { http } = require("@architect/functions");
const { get } = require("tiny-json-http");

const { makeResponse } = require("@architect/shared/make-response");
const { requestFactory } = require("@architect/shared/utils");

/**
 * @param {Portify.BuildRequest} buildRequest
 * @param {string} artistId
 */
function getArtist(buildRequest, artistId) {
	return buildRequest(`/artists/${artistId}`);
}

/**
 * @param {Portify.BuildRequest} buildRequest
 * @param {string} artistId
 */
function getAlbums(buildRequest, artistId) {
	const params = {
		include_groups: "appears_on",
		market: "from_token",
		limit: 10,
	};

	return buildRequest(`/artists/${artistId}/albums`, params);
}

/**
 * @param {Portify.BuildRequest} buildRequest
 * @param {string} artistId
 */
function getTopTracks(buildRequest, artistId) {
	const params = {
		market: "from_token",
		limit: 10,
	};

	return buildRequest(`/artists/${artistId}/top-tracks`, params);
}

/**
 * @param {Portify.BuildRequest} buildRequest
 * @param {string} artistId
 */
function getRelatedArtists(buildRequest, artistId) {
	return buildRequest(`/artists/${artistId}/related-artists`);
}

/**
 * @param {HttpRequest} req
 */
async function getData({ session, pathParameters }) {
	const { artistId } = pathParameters;
	const buildRequest = requestFactory(process.env, session);

	const artistReq = getArtist(buildRequest, artistId);
	const relatedReq = getRelatedArtists(buildRequest, artistId);
	const albumReq = getAlbums(buildRequest, artistId);
	const tracksReq = getTopTracks(buildRequest, artistId);
	
}

module.exports = {
	getData,
	handler: http.async(makeResponse(getData)),
};
