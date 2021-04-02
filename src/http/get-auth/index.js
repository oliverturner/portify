const { http } = require("@architect/functions");
const { get, post } = require("tiny-json-http");

const { requestFactory } = require("@architect/shared/utils");
const { makeSessionRequest } = require("@architect/shared/session-request");

/**
 * Simplify user object returned by Spotify
 *
 * UserObject is private because, in order to use the `from_token` value to 
 * avoid returning per-market availability in queries for tracks and albums, we 
 * need access to their market
 *
 * @param {SpotifyApi.UserObjectPrivate} userResult
 *
 * @returns {PortifyApi.User}
 */
function processUser(userResult) {
	const { images, id, product, display_name = "" } = userResult;
	const imageUrl =
		(images && images[0] && images[0].url) || "/_static/assets/portify.svg";

	return {
		id,
		display_name,
		product,
		imageUrl,
	};
}

/** @type {Architect.HttpHandler} */
const getAuth = async (req) => {
	try {
		const {
			queryStringParameters: { code = "" },
		} = req;

		const grant_type = "authorization_code";
		const sessionReq = makeSessionRequest(process.env, { code, grant_type });
		const session = (await post(sessionReq)).body;

		const getRequest = requestFactory(process.env, session);
		const userRequest = getRequest("/me");
		const userResult = (await get(userRequest)).body;
		const user = processUser(userResult);

		return {
			session: Object.assign({}, session, { user }),
			location: "/",
		};
	} catch (error) {
		return {
			json: {
				statusCode: error.code,
				body: error.message,
			},
		};
	}
};

module.exports = {
	handler: http.async(getAuth),
};
