/**
 * @typedef {import("@architect/functions").HttpHandler} HttpHandler
 */

const { post } = require("tiny-json-http");

const { makeSessionRequest, getLogoutResponse } = require("./session-request");

/**
 * Execute the `handleReq` callback and return response 
 * Handle retries where auth has expired
 * Logout on failed retry
 * 
 * @type {(fn: Function) => HttpHandler}
 */
const makeResponse = (handleReq) => async (req) => {
	try {
		return await handleReq(req);
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

				// Retain all other session props: only update access_token
				req.session.access_token = access_token;
				return await handleReq(req);
			} catch (error) {
				return getLogoutResponse();
			}
		}

		return error;
	}
};

module.exports = {
	makeResponse,
};
