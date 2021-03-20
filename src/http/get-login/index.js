/**
 * @typedef {import("@architect/functions").HttpHandler} HttpHandler
 * @typedef {import("@architect/functions").HttpRequest} HttpRequest
 * @typedef {import("@architect/functions").HttpResponse} HttpResponse
 */

const { http } = require("@architect/functions");
const { getLoginUrl } = require("@architect/shared/app");

/**
 * @param {HttpRequest} req
 * @returns {Promise<HttpResponse>}
 */
/** @type {HttpHandler} */
const getData = async (req) => {
	const { user } = req.session || {};
	const loginUrl = getLoginUrl(process.env);

	return {
		headers: {
			"content-type": "application/json; charset=utf-8",
			"cache-control":
				"no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
		},
		statusCode: 200,
		body: JSON.stringify({ user, loginUrl }),
	};
};

module.exports = {
	getLoginUrl,
	getData: getData,
	handler: http.async(getData),
};
