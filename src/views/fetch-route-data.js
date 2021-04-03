const { getPlaylists } = require("./get-playlists");

/**
 * Return a consistently structured page object
 *
 * @type {PortifyApi.FetchRouteData<any>}
 * @returns {Promise<PortifyApi.AppDataGeneric>}
 */
async function fetchRouteData(req, routeId, getRouteDataFn) {
	const [playlists, routeData] = await Promise.all([
		getPlaylists(req),
		getRouteDataFn(req),
	]);

	return {
		user: req.session && req.session.user,
		playlists,
		route: {
			id: routeId,
			data: routeData,
		},
	};
}

module.exports = {
	fetchRouteData,
};
