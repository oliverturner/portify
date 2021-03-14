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
 * Translate the full object into a lighter representation
 *
 * @param {SpotifyApi.TrackObjectFull} item
 * @returns {Portify.TrackItem}
 */
function convertTrackObject(item) {
	const { id, name, album, artists, is_playable, is_local } = item;

	return {
		id,
		name,
		href: `/albums/${album.id}`,
		is_playable: isPlayable(is_playable, is_local),
		artists: artists.map(({ id, name }) => ({ id, name })),
		images: processImages(album.images),
	};
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
	convertTrackObject,
	isCollection,
};
