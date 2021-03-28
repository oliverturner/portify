const { http } = require("@architect/functions");
const { getLayout } = require("@architect/views/layout");
const { handleRequest } = require("@architect/shared/handle-request");
const { getPlaylist } = require("@architect/views/get-playlist");

/**
 * @param {PortifyApi.PlaylistTracksPage} data
 */
function render(data) {
	let items = "";
	for (const item of data.items) {
		items += `<li>${item.name}</li>`;
	}

	return `
		<p>Playlist: ${data.name}</p>
		<ul>${items}</ul>
	`;
}

/**
 * @param {Architect.HttpRequest} req
 */
async function getContent(req) {
	const data = await getPlaylist(req);

	return getLayout({
		nav: true,
		title: `playlist: ${data.name}`,
		content: render(data),
		data: JSON.stringify(data),
	});
}

module.exports = {
	handler: http.async(handleRequest(getContent, "html")),
};
