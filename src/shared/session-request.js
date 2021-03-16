/**
 * @param {string} [clientId]
 * @param {string} [clientSecret]
 * @returns
 */
function getTokenHeaders(clientId, clientSecret) {
	const clientToken = Buffer.from(`${clientId}:${clientSecret}`).toString(
		"base64"
	);
	return {
		"Content-Type": "application/x-www-form-urlencoded",
		Authorization: `Basic ${clientToken}`,
	};
}

/**
 * Create a request config for auth or refresh
 *
 * @param {NodeJS.ProcessEnv} envVars
 * @param {PortifyApp.SessionRequestData} data
 */
function makeSessionRequest(envVars, data) {
	const {
		SPOTIFY_CLIENT_ID: clientId,
		SPOTIFY_CLIENT_SECRET: clientSecret,
		SPOTIFY_LOGIN_URL: loginUrl,
		SPOTIFY_LOGIN_REDIRECT: redirect_uri,
	} = envVars;

	return {
		url: `${loginUrl}/api/token`,
		headers: getTokenHeaders(clientId, clientSecret),
		data: { ...data, redirect_uri },
	};
}

function getLogoutResponse() {
	return {
		session: {},
		location: "/",
	};
}

module.exports = {
	getLogoutResponse,
	makeSessionRequest,
};
