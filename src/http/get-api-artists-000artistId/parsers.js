/**
 * @typedef {import("@architect/functions").HttpRequest} HttpRequest
 *
 * @typedef {SpotifyApi.ArtistObjectFull} ArtistObjectFull
 * @typedef {SpotifyApi.PagingObject<SpotifyApi.AlbumObjectSimplified>} AlbumPage
 * @typedef {SpotifyApi.TrackObjectFull} TrackObjectFull
 */

const { convertImages, convertArtists } = require("@architect/shared/spotify");

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
 * @param {{tracks: TrackObjectFull[]}} params
 */
function processTopTracks({ tracks }) {
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
 * @param {{ artists: ArtistObjectFull[] }} body
 */
function processRelatedArtists({ artists }) {
	return artists.map(({ id, name, genres, images }) => ({
		id,
		name,
		genres,
		images: convertImages(images),
	}));
}

module.exports = {
  processArtist,
	processAlbums,
	processTopTracks,
  processRelatedArtists
};
