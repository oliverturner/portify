/**
 * @typedef {import("@architect/functions").HttpRequest} HttpRequest
 *
 * @typedef {SpotifyApi.ArtistObjectFull} ArtistObjectFull
 * @typedef {SpotifyApi.PagingObject<SpotifyApi.AlbumObjectSimplified>} AlbumPage
 * @typedef {SpotifyApi.TrackObjectFull} TrackObjectFull
 */

const { http } = require("@architect/functions");
const { get } = require("tiny-json-http");

const { makeResponse } = require("@architect/shared/make-response");
const { requestFactory } = require("@architect/shared/utils");
const parsers = require("./parsers");

/**
 * @param {Portify.BuildRequest} buildRequest
 * @param {string} artistId
 */
function getArtist(buildRequest, artistId) {
	return {
		req: buildRequest(`/artists/${artistId}`),
		fn: parsers.processArtist,
	};
}

/**
 * @param {Portify.BuildRequest} buildRequest
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
 * @param {Portify.BuildRequest} buildRequest
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
 * @param {Portify.BuildRequest} buildRequest
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
 * @param {Record<string, {req:Portify.RequestConfig, fn: Function}>} requests
 */
async function processRequests(requests) {
	const promises = Object.entries(requests).map(async ([key, { req, fn }]) => {
		const { body } = await get(req);
		return [key, fn(body)];
	});

	return Object.fromEntries(await Promise.all(promises));
}

/**
 * @param {HttpRequest} req
 */
async function getData({ session, pathParameters }) {
	const { artistId } = pathParameters;
	const buildRequest = requestFactory(process.env, session);

	const requests = {
		artist: getArtist(buildRequest, artistId),
		appearsOn: getAlbums(buildRequest, artistId),
		topTracks: getTopTracks(buildRequest, artistId),
		relatedArtists: getRelatedArtists(buildRequest, artistId),
	};

	return processRequests(requests);
}

module.exports = {
	getData,
	handler: http.async(makeResponse(getData)),
};
