const { http } = require("@architect/functions");
const { handleRequest } = require("@architect/shared/handle-request");
const { getPlaylist } = require("@architect/views/get-playlist");

module.exports = {
	handler: http.async(handleRequest(getPlaylist, "json")),
};
