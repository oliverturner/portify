/**
 * @typedef {import("@architect/functions").HttpRequest} HttpRequest
 *
 * @typedef {SpotifyApi.TrackObjectFull} TrackObjectFull
 * @typedef {SpotifyApi.ArtistObjectFull} ArtistObjectFull
 * @typedef {SpotifyApi.PagingObject<SpotifyApi.AlbumObjectSimplified>} AlbumPage
 */

const { convertImages, convertArtists } = require("@architect/shared/spotify");

// TODO: Define Portify.X types for this output
// TODO: Add href props consistently to all endpoints
// TODO: Add hash fragments to all tracks: href: `/albums/${album.id}#${id}`,
/**
 * @param {ArtistObjectFull} body
 * @returns {PortifyApi.ArtistFull}
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

// TODO: return a paged object: load next on scroll
/**
 * @param {AlbumPage} body
 * @returns {PortifyApi.Album[]}
 */
function processAlbums({ items }) {
	return items.map(
		({ id, name, release_date, album_type, images, artists }) => ({
			id,
			name,
			href: `/albums/${id}`,
			release_date,
			album_type,
			images: convertImages(images),
			artists: convertArtists(artists),
		})
	);
}

/**
 * @param {{tracks: TrackObjectFull[]}} params
 * @returns {PortifyApi.TrackItemBase[]}
 */
function processTopTracks({ tracks }) {
	return tracks.map(({ id, name, album, artists, is_playable }) => ({
		id,
		name,
		href: `/albums/${album.id}#${id}`,
		release_date: album.release_date,
		images: convertImages(album.images),
		artists: convertArtists(artists),
	}));
}

/**
 * @param {{ artists: ArtistObjectFull[] }} body
 * @returns {PortifyApi.ArtistFull[]}
 */
function processRelatedArtists({ artists }) {
	return artists.map(({ id, name, genres, images }) => ({
		id,
		name,
		genres,
		href: `/artists/${id}`,
		images: convertImages(images),
	}));
}

module.exports = {
	processArtist,
	processAlbums,
	processTopTracks,
	processRelatedArtists,
};
