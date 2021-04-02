const { http } = require("@architect/functions");
const { handleRequest } = require("@architect/shared/handle-request");
const { buildLayout } = require("@architect/views/build-layout");
const { fetchRouteData } = require("@architect/views/fetch-route-data");

const { getArtist } = require("@architect/views/get-artist");

/**
 * @param {Architect.HttpRequest} req
 */
async function getIndex(req) {
	/** @type {PortifyApi.RouteData<PortifyApi.ArtistResponse>} */
	const routeData = await fetchRouteData(req, "artist", getArtist);
	const { pageData: artist } = routeData;

	return buildLayout({
		title: `Artist: ${artist.bio.name}`,
		routeData,
	});
}

module.exports = {
	handler: http.async(handleRequest(getIndex, "html")),
};
