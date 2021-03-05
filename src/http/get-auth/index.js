/**
 * @typedef {import("@architect/functions").HttpHandler} HttpHandler
 */

const { http } = require("@architect/functions");
const { get, post } = require("tiny-json-http");

const { requestFactory } = require("@architect/shared/utils");
const { makeSessionRequest } = require("@architect/shared/session-init");

/** @type {HttpHandler} */
const getAuth = async (req) => {
	try {
		const {
			queryStringParameters: { code = "" },
		} = req;

		let session = {};
		if (code.length > 0) {
			const sessionRequest = makeSessionRequest(code, process.env);
			session = (await post(sessionRequest)).body;
		}

		const getRequest = requestFactory(process.env, session);
		const userRequest = getRequest("/me");
		const userResult = (await get(userRequest)).body;

		return {
			session: Object.assign({}, session, { user: userResult }),
			location: "/",
		};
	} catch (error) {
		return {
			statusCode: error.code,
			body: error.message,
		};
	}
};

module.exports = {
	handler: http.async(getAuth),
};
