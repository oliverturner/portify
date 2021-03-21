const { http } = require("@architect/functions");
const { handleRequest } = require("@architect/shared/handle-request");
const { getPlaylists } = require("@architect/views/get-playlists");

module.exports = {
	handler: http.async(handleRequest(getPlaylists, "json")),
};
