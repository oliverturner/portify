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
const { convertImages, convertArtists } = require("@architect/shared/spotify");

/**
 * @param {Portify.BuildRequest} buildRequest
 * @param {string} artistId
 */
function getArtist(buildRequest, artistId) {
	return buildRequest(`/artists/${artistId}`);
}

/**
 * @param {ArtistObjectFull} body
 */
function processArtist({ id, name, images, genres }) {
	return {
		id,
		name,
		genres,
		href: `/artists/${id}`,
		images: convertImages(images),
	};
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
 * @param {AlbumPage} body
 */
function processAlbums({ items }) {
	return items.map(
		({ id, name, release_date, album_type, images, artists }) => ({
			id,
			name,
			release_date,
			album_type,
			images: convertImages(images),
			artists: convertArtists(artists),
		})
	);
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
 * @param {{tracks: TrackObjectFull[]}} params
 */
function processTracks({ tracks }) {
	return tracks.map(({ id, name, album, artists }) => ({
		id,
		name,
		href: `/albums/${album.id}`,
		release_date: album.release_date,
		images: convertImages(album.images),
		artists: convertArtists(artists),
	}));
}

/**
 * @param {Portify.BuildRequest} buildRequest
 * @param {string} artistId
 */
function getRelatedArtists(buildRequest, artistId) {
	return buildRequest(`/artists/${artistId}/related-artists`);
}

/**
 * @param {{ artists: ArtistObjectFull[] }} body
 */
function processArtists({ artists }) {
	return artists.map(({ id, name, genres, images }) => ({
		id,
		name,
		genres,
		images: convertImages(images),
	}));
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
		artist: { req: getArtist(buildRequest, artistId), fn: processArtist },
		appearsOn: { req: getAlbums(buildRequest, artistId), fn: processAlbums },
		topTracks: { req: getTopTracks(buildRequest, artistId), fn: processTracks },
		relatedArtists: {
			req: getRelatedArtists(buildRequest, artistId),
			fn: processArtists,
		},
	};

	return processRequests(requests);
}

module.exports = {
	getData,
	handler: http.async(makeResponse(getData)),
};
