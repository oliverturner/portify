const { getLayout } = require("../views/layout");

/**
 * Abstract session handling
 * Automatically redirect to login screen if session is invalid
 *
 * @type {(fn: Function) => Architect.HttpHandler}
 */
const onContentRequest = (requestHandler) => async (req) => {
	try {
		const html = getLayout(await requestHandler(req));

		return {
			html,
		};
	} catch (error) {
		return {
			statusCode: error.statusCode,
			json: {
				statusMessage: error.statusMessage,
			},
		};
	}
};

module.exports = {
	onContentRequest,
};
