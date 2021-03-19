/**
 * @typedef {import("@architect/functions").HttpHandler} HttpHandler
 * @typedef {import("@architect/functions").HttpRequest} HttpRequest
 * @typedef {import("@architect/functions").HttpResponse} HttpResponse
 */

const { http } = require("@architect/functions");
const { buildUrl } = require("@architect/shared/utils");

/**
 * @param {NodeJS.ProcessEnv} envVars
 * @param {string[]} scopes
 * @returns {string}
 */
function getLoginUrl(envVars, scopes) {
	const {
		SPOTIFY_CLIENT_ID: client_id = "",
		SPOTIFY_LOGIN_URL: base = "",
		SPOTIFY_LOGIN_REDIRECT: redirect_uri = "",
	} = envVars;

	return buildUrl({
		base,
		path: "/authorize",
		params: {
			client_id,
			redirect_uri,
			response_type: "code",
			scope: scopes.join(" "),
		},
	});
}

/**
 * @param {HttpRequest} req
 * @returns {Promise<HttpResponse>}
 */
/** @type {HttpHandler} */
const getData = async (req) => {
	const { user } = req.session || {};

	const scopes = [
		"user-top-read",
		"user-modify-playback-state",
		"playlist-read-private",
	];
	const loginUrl = getLoginUrl(process.env, scopes);

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
