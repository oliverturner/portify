const { http } = require("@architect/functions");
const { handleRequest } = require("@architect/shared/handle-request");
const { getTop } = require("@architect/views/get-top");

module.exports = {
	handler: http.async(handleRequest(getTop, "json")),
};
