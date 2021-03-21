const { http } = require("@architect/functions");
const { handleRequest } = require("@architect/shared/handle-request");
const { getArtist } = require("@architect/views/get-artist");

module.exports = {
	handler: http.async(handleRequest(getArtist, "json")),
};
