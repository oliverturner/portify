/**
 * @typedef {PortifyApi.Page<PortifyApi.Playlist>} PlaylistPage
 * @typedef {{items: PortifyApi.TrackItemBase[]}} TopPage
 */

const { http } = require("@architect/functions");
const { getLoginUrl } = require("@architect/shared/app");
const { handleRequest } = require("@architect/shared/handle-request");
const { getLayout } = require("@architect/views/layout");
const { getPlaylists } = require("@architect/views/get-playlists");
const { getTop } = require("@architect/views/get-top");

/**
 * @param {Architect.HttpRequest} req
 */
async function getIndex(req) {
	const loginUrl = getLoginUrl(process.env);

	// Default: show log-in link
	let content = `<p><a href=${loginUrl}>log in</a></p>`;
	let data = "";

	// User has logged in: show content instead
	if (req.session && req.session.user) {
		const [playlists, top] = await Promise.all([
			getPlaylists(req),
			getTop(req),
		]);

		data = JSON.stringify({
			user: req.session.user,
			playlists,
			top,
		});
	}

	return getLayout({
		nav: true,
		title: "home",
		content,
		data,
	});
}

module.exports = {
	handler: http.async(handleRequest(getIndex, "html")),
};
