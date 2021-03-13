/**
 * Translate the full object into a lighter representation
 *
 * @param {SpotifyApi.TrackObjectFull} item
 * @returns {Portify.TrackItem}
 */
function convertTrackObject(item) {
	const { artists: artistsRaw, id, name } = item;
	const artists = artistsRaw.map(({ id, name }) => ({ id, name }));

	return { id, artists, name };
}

module.exports = {
	convertTrackObject,
};
