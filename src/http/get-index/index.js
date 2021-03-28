/**
 * @typedef {PortifyApi.Page<PortifyApi.Playlist>} PlaylistPage
 * @typedef {{items: PortifyApi.TrackItemBase[]}} TopPage
 */

const { http } = require("@architect/functions");
const { handleRequest } = require("@architect/shared/handle-request");
const { getLayout } = require("@architect/views/layout");
const { getPlaylists } = require("@architect/views/get-playlists");
const { getTop } = require("@architect/views/get-top");

/**
 * @param {Architect.HttpRequest} req
 */
async function getIndex(req) {
	const [playlists, top] = await Promise.all([getPlaylists(req), getTop(req)]);

	const data = JSON.stringify({
		user: req.session && req.session.user,
		playlists,
		top,
	});

	return getLayout({
		nav: true,
		title: "home",
		content: "",
		data,
	});
}

module.exports = {
	handler: http.async(handleRequest(getIndex, "html")),
};
