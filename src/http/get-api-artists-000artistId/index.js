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

function processArtist() {}

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

function processAlbums() {}

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

function processTracks() {}

/**
 * @param {Portify.BuildRequest} buildRequest
 * @param {string} artistId
 */
function getRelatedArtists(buildRequest, artistId) {
	return buildRequest(`/artists/${artistId}/related-artists`);
}

function processArtists() {}

/**
 * @param {HttpRequest} req
 */
async function getData({ session, pathParameters }) {
	const { artistId } = pathParameters;
	const buildRequest = requestFactory(process.env, session);

	const requests = {
		artist: { url: getArtist(buildRequest, artistId), fn: processArtist },
		appearsOn: { url: getAlbums(buildRequest, artistId), fn: processAlbums },
		topTracks: { url: getTopTracks(buildRequest, artistId), fn: processTracks },
		relatedArtists: {
			url: getRelatedArtists(buildRequest, artistId),
			fn: processArtists,
		},
	};
}

module.exports = {
	getData,
	handler: http.async(makeResponse(getData)),
};
