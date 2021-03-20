const { http } = require("@architect/functions");
const { onContentRequest } = require("@architect/shared/on-content-request");
const { getData } = require("../get-api-albums-000albumId");

/**
 * @param {Architect.HttpRequest} req
 */
async function getContent(req) {
	const data = await getData(req);
	const content = `<p>Album: ${data.name}</p>`;

	return content;
}

module.exports = {
	handler: http.async(onContentRequest(getContent)),
};
