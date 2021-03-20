const { http } = require("@architect/functions");
const { onContentRequest } = require("@architect/shared/on-content-request");
const { getData } = require("../get-api-artists-000artistId");

/**
 * @param {Architect.HttpRequest} req
 */
async function getContent(req) {
	const data = await getData(req);
	return `Artist: ${data.artist.name}`;
}

module.exports = {
	handler: http.async(onContentRequest(getContent)),
};
