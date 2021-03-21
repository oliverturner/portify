const { http } = require("@architect/functions");
const { handleRequest } = require("@architect/shared/handle-request");
const { getAlbum } = require("@architect/views/get-album");

module.exports = {
	handler: http.async(handleRequest(getAlbum, "json")),
};
