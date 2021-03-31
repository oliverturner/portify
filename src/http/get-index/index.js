/**
 * @typedef {PortifyApi.Page<PortifyApi.Playlist>} PlaylistPage
 * @typedef {{items: PortifyApi.TrackItemBase[]}} TopPage
 */

const { http } = require("@architect/functions");
const { handleRequest } = require("@architect/shared/handle-request");
const { buildLayout } = require("@architect/views/build-layout");
const { fetchRouteData } = require("@architect/views/fetch-route-data");

const { getTop } = require("@architect/views/get-top");

/**
 * @param {Architect.HttpRequest} req
 */
async function getIndex(req) {
	const routeData = await fetchRouteData(req, getTop);

	return buildLayout({
		nav: true,
		title: "home",
		routeData,
	});
}

module.exports = {
	handler: http.async(handleRequest(getIndex, "html")),
};
