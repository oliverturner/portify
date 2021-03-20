const { http } = require("@architect/functions");
const { onContentRequest } = require("@architect/shared/on-content-request");
const { getData } = require("../get-api-playlists-000playlistId");

/**
 * @param {Architect.HttpRequest} req
 */
async function getContent(req) {
	const data = await getData(req);

	let items = "";
	for (const item of data.items) {
		items += `<li>${item.name}</li>`;
	}

	const content = `
	<p>Playlist: ${data.name}</p>
	<ul>${items}</ul>
	`;

	return content;
}

module.exports = {
	handler: http.async(onContentRequest(getContent)),
};
