const { http } = require("@architect/functions");
const { buildLayout } = require("@architect/views/build-layout");
const { handleRequest } = require("@architect/shared/handle-request");
const { fetchRouteData } = require("@architect/views/fetch-route-data");
const { getPlaylist } = require("@architect/views/get-playlist");

/**
 * @param {Architect.HttpRequest} req
 */
async function getContent(req) {
	/** @type {PortifyApi.RouteData<PortifyApi.Playlist>} */
	const routeData = await fetchRouteData(req, getPlaylist);
	const { pageData: playlist } = routeData;

	return buildLayout({
		nav: true,
		title: `playlist: ${playlist.name}`,
		routeData,
	});
}

module.exports = {
	handler: http.async(handleRequest(getContent, "html")),
};
