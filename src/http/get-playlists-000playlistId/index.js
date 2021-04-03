const { http } = require("@architect/functions");
const { buildLayout } = require("@architect/views/build-layout");
const { handleRequest } = require("@architect/shared/handle-request");
const { fetchRouteData } = require("@architect/views/fetch-route-data");
const { getPlaylist } = require("@architect/views/get-playlist");

/**
 * @param {Architect.HttpRequest} req
 */
async function getContent(req) {
	/** @type {PortifyApi.AppData<PortifyApi.Playlist>} */
	const appData = await fetchRouteData(req, "playlist", getPlaylist);
	const playlist = appData.route.data;

	return buildLayout({
		title: `Playlist: ${playlist.name}`,
		appData: appData,
	});
}

module.exports = {
	handler: http.async(handleRequest(getContent, "html")),
};
