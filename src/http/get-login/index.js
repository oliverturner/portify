const { http } = require("@architect/functions");
const { getLoginUrl } = require("@architect/shared/app");

/**
 * @param {Architect.HttpRequest} req
 */
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
	getData,
	handler: http.async(getData),
};
