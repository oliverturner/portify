const { http } = require("@architect/functions");
const { getLoginUrl } = require("@architect/shared/app");

const getLogin = async () => {
	const loginUrl = getLoginUrl(process.env);

	const html = `
		<div class="login">
			<p><span class="title">Portify</span> makes it easy to support the artists you follow on Spotify.</p> 
			<a class="loginbtn" href="${loginUrl}">
				<svg class="icon icon--spotify" aria-hidden="true">
					<use xlink:href="#icon-spotify"></use>
				</svg>
				<svg class="icon icon--arrow" aria-hidden="true">
					<use xlink:href="#icon-arrow-up"></use>
				</svg>
				<p class="cta title">click!</p>
			</a>
			<p>Logging in lets the app show you the tracks in your playlists with added links to
			Beatport and Bandcamp.</p> 
			<p>Your details are never recorded.</p>
			<hr>
			<p><span class="title">Portify</span> was made in the hope of making it
			easier give a little back to the artists that give us so much. As a
			fully
			<a href="https://github.com/oliverturner/beatportify">open source project</a> your feedback,
			suggestions, and contributions are welcome.</p></div>
	`;

	return {
		html,
	};
};

// TODO: extract into @view
module.exports = {
	getLogin,
	handler: http.async(getLogin),
};
