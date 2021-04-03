const { http } = require("@architect/functions");
const { handleRequest } = require("@architect/shared/handle-request");
const { buildLayout } = require("@architect/views/build-layout");
const { fetchRouteData } = require("@architect/views/fetch-route-data");

const { getAlbum } = require("@architect/views/get-album");

/**
 * @param {Architect.HttpRequest} req
 */
async function getIndex(req) {
	/** @type {PortifyApi.AppData<PortifyApi.Album>} */
	const appData = await fetchRouteData(req, "album", getAlbum);
	const album = appData.route.data;

	return buildLayout({
		title: `Album: ${album.name}`,
		appData,
	});
}

module.exports = {
	handler: http.async(handleRequest(getIndex, "html")),
};
