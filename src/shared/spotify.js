/**
 * @typedef {SpotifyApi.TrackObjectSimplified|SpotifyApi.TrackObjectFull} TrackObject
 */

/**
 * @param {SpotifyApi.ImageObject[]} rawImages
 */
function processImages(rawImages) {
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
	return artists.map(({ id, name }) => ({ id, name }));
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

	/** @type {Portify.TrackItemBase} */
	const trackItem = {
		id,
		name,
		is_playable: isPlayable(is_playable),
		artists: convertArtists(artists),
		playLink: `/api/play/${id}`,
	};

	if (isTrackObjectFull(item)) {
		trackItem.href = `/albums/${item.album.id}`;
		trackItem.images = processImages(item.album.images);
	}

	return trackItem;
}

/**
 * @param {SpotifyApi.TrackObjectFull[]} items
 */
function isCollection(items) {
	return (
		items.length > 1 && new Set(items.map(({ album }) => album.id)).size === 1
	);
}

module.exports = {
	processImages,
	convertArtists,
	convertTrackObject,
	isCollection,
};
