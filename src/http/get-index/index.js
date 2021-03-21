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
 * @param {{id: string, name: string}[]} items
 */
function renderPlaylists(items) {
	let html = "";
	for (const item of items) {
		html += `<li><a href="/playlists/${item.id}">${item.name}</a></li>`;
	}

	return html;
}

/**
 * @param {{id: string, name: string}[]} items
 */
function renderTracks(items) {
	let html = "";
	for (const item of items) {
		html += `<li>${item.name}</li>`;
	}

	return html;
}

/**
 * @param {{
 *   user: SpotifyApi.UserObjectPublic;
 *   data: {
 *     playlists: PlaylistPage,
 *     top: TopPage
 *   };
 * }} params
 */
function render({ user, data: { playlists, top } }) {
	console.log(JSON.stringify(user, null, 2));

	return `
		<p>Welcome ${user.display_name}</p>
		<div class="flex">
			<div class="column">
				<p>Playlists:</p>
				<ul>${renderPlaylists(playlists.items)}</ul>
			</div>
			<div class="column column--stretch">
				<p>Top tracks:</p>
				<ul>${renderTracks(top.items)}</ul>
			</div>
		</div>
	`;
}

/**
 * @param {Architect.HttpRequest} req
 */
async function getIndex(req) {
	const loginUrl = await getLoginUrl(process.env);

	// Default: show log-in link
	let content = `<p><a href=${loginUrl}>log in</a></p>`;

	// User has logged in: show content instead
	if (req.session && req.session.user) {
		const [playlists, top] = await Promise.all([
			getPlaylists(req),
			getTop(req),
		]);

		content = render({
			user: req.session.user,
			data: { playlists, top },
		});
	}

	return getLayout({
		nav: true,
		title: "home",
		content,
	});
}

module.exports = {
	render,
	handler: http.async(handleRequest(getIndex, "html")),
};
