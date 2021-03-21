const { buildUrl } = require("./utils");

const scopes = [
	"user-top-read",
	"user-modify-playback-state",
	"playlist-read-private",
];

/**
 * @param {NodeJS.ProcessEnv} envVars
 */
function getLoginUrl(envVars) {
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

module.exports = {
	getLoginUrl,
};
