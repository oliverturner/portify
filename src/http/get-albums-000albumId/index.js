const { http } = require("@architect/functions");
const { handleRequest } = require("@architect/shared/handle-request");
const { getAlbum } = require("@architect/views/get-album");

// TODO create the HTML representation
module.exports = {
	handler: http.async(handleRequest(getAlbum, "html")),
};
