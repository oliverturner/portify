const { http } = require("@architect/functions");
const { get, post } = require("tiny-json-http");

const { requestFactory } = require("@architect/shared/utils");
const { makeSessionRequest } = require("@architect/shared/session-request");

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
