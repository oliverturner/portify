const { http } = require("@architect/functions");
const { onContentRequest } = require("@architect/shared/on-content-request");
const { getData } = require("../get-api-playlists");

/**
 * @param {Architect.HttpRequest} req
 */
async function getContent(req) {
	const data = await getData(req);

	let items = "";
	for (const item of data.items) {
		items += `<li><a href="/playlists/${item.id}">${item.name}</a></li>`;
	}

	return `
		<ul>${items}</ul>
	`;
}

module.exports = {
	handler: http.async(onContentRequest(getContent)),
};
