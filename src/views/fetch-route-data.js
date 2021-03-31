const { getPlaylists } = require("./get-playlists");

/**
 * Return a consistently structured page object
 *
 * @type {PortifyApi.FetchRouteData<any>}
 */
async function fetchRouteData(req, getRouteDataFn) {
	const [playlists, pageData] = await Promise.all([
		getPlaylists(req),
		getRouteDataFn(req),
	]);

	return {
		user: req.session && req.session.user,
		playlists,
		pageData,
	};
}

module.exports = {
	fetchRouteData,
};
