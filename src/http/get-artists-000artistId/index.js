const { http } = require("@architect/functions");
const { handleRequest } = require("@architect/shared/handle-request");
const { buildLayout } = require("@architect/views/build-layout");
const { fetchRouteData } = require("@architect/views/fetch-route-data");

const { getArtist } = require("@architect/views/get-artist");

/**
 * @param {Architect.HttpRequest} req
 */
async function getIndex(req) {
	/** @type {PortifyApi.AppData<PortifyApi.ArtistPage>} */
	const appData = await fetchRouteData(req, "artist", getArtist);
	const artist = appData.route.data;

	return buildLayout({
		title: `Artist: ${artist.bio.name}`,
		appData,
	});
}

module.exports = {
	handler: http.async(handleRequest(getIndex, "html")),
};
