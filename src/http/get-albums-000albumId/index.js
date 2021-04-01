const { http } = require("@architect/functions");
const { handleRequest } = require("@architect/shared/handle-request");
const { buildLayout } = require("@architect/views/build-layout");
const { fetchRouteData } = require("@architect/views/fetch-route-data");

const { getAlbum } = require("@architect/views/get-album");

/**
 * @param {Architect.HttpRequest} req
 */
async function getIndex(req) {
	/** @type {PortifyApi.RouteData<PortifyApi.Album>} */
	const routeData = await fetchRouteData(req, getAlbum);
	const { pageData: album } = routeData;

	return buildLayout({
		title: `Album: ${album.name}`,
		routeData
	});
}

module.exports = {
	handler: http.async(handleRequest(getIndex, "html")),
};
