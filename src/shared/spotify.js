/**
 * @typedef {SpotifyApi.TrackObjectSimplified|SpotifyApi.TrackObjectFull} TrackObject
 */

/**
 * @param {SpotifyApi.ImageObject[]} rawImages
 */
function convertImages(rawImages) {
	/** @type Record<string, string> */
	const images = {};
	for (const { width, url } of rawImages) {
		images[String(width)] = url;
	}

	return images;
}

/**
 * @param {*} [is_playable]
 * @param {*} [is_local]
 */
function isPlayable(is_playable, is_local) {
	if (is_local) return false;
	if (is_playable === false) return false;

	return true;
}

/**
 * @param {SpotifyApi.ArtistObjectSimplified[]} artists
 * @returns
 */
function convertArtists(artists) {
	return artists.map(({ id, name }) => ({ id, name, href: `/artists/${id}` }));
}

/** @type {(item: any) => item is SpotifyApi.TrackObjectFull} */
function isTrackObjectFull(item) {
	return item.album !== undefined;
}

/**
 * Translate the full object into a lighter representation
 *
 * @param {TrackObject} item
 */
function convertTrackObject(item) {
	const { id, name, artists, is_playable } = item;

	/** @type {PortifyApi.TrackItemBase} */
	const trackItem = {
		id,
		name,
		artists: convertArtists(artists),
	};

	if (isPlayable(is_playable)) {
		trackItem.playLink = `/api/play/${id}`;
	}

	if (isTrackObjectFull(item)) {
		trackItem.href = `/albums/${item.album.id}`;
		trackItem.images = convertImages(item.album.images);
	}

	return trackItem;
}

/**
 * @param {SpotifyApi.TrackObjectFull[]} items
 */
function isCollection(items) {
	return items.length > 1 && new Set(items.map(({ album }) => album.id)).size === 1
}

module.exports = {
	convertImages,
	convertArtists,
	convertTrackObject,
	isCollection,
};
