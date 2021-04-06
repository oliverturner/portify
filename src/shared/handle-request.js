const { post } = require("tiny-json-http");
const { makeSessionRequest, getLogoutResponse } = require("./session-request");

/**
 * Abstract session handling
 * Automatically redirect to login screen if session is invalid
 *
 * @type {PortifyApp.RequestHandler}
 */
const handleRequest = (routeFn, type) => async (req) => {
	try {
		return { [type]: await routeFn(req) };
	} catch (error) {
		if (!req.session) {
			return getLogoutResponse();
		}

		if (error.statusCode === 401) {
			try {
				const refreshReq = makeSessionRequest(process.env, {
					refresh_token: req.session.refresh_token,
					grant_type: "refresh_token",
				});
				const { access_token } = (await post(refreshReq)).body;

				// The refresh_token is only issued once at session initialisation
				// Retain all other props and only update access_token
				req.session.access_token = access_token;
				return { [type]: await routeFn(req) };
			} catch (error) {
				return getLogoutResponse();
			}
		}

		console.log(error);

		return {
			[type]: {
				statusCode: error.statusCode,
				message: error.message,
			},
		};
	}
};

module.exports = {
	handleRequest,
};
