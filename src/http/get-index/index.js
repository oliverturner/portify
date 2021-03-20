const { http } = require("@architect/functions");
const { getLoginUrl } = require("@architect/shared/app");
const { onContentRequest } = require("@architect/shared/on-content-request");

/**
 * @param {Architect.HttpRequest} req
 */
async function getIndex({ session }) {
	const loginUrl = await getLoginUrl(process.env);

	// Default: show log-in link
	let content = `<p><a href=${loginUrl}>log in</a></p>`;

	// User has logged in: show content instead
	if (session && session.user) {
		console.log(JSON.stringify(session.user, null, 2));

		content = `
      <p>yay</p>
      <form action="/logout" method="post"><button>logout</button></p>
    `;
	}

	return content;
}

module.exports = {
	handler: http.async(onContentRequest(getIndex)),
};
	