// @ts-nocheck
const test = require("tape");

const { getLogin } = require("../src/http/get-login");
const { getLoginUrl } = require("../src/shared/app");
const { getTestEnv } = require("./helpers");

const testTitle = "get-login";
const testEnv = getTestEnv(testTitle);

testEnv.up();

// test(`${testTitle}.getData`, async (t) => {
// 	const {
// 		SPOTIFY_LOGIN_REDIRECT,
// 		SPOTIFY_LOGIN_URL,
// 		SPOTIFY_CLIENT_ID,
// 	} = process.env;

// 	function getUserResponse(user) {
// 		const encodedAuthUrl = encodeURIComponent(SPOTIFY_LOGIN_REDIRECT);
// 		const redirectUri = `${encodedAuthUrl}&response_type=code&scope=user-top-read+user-modify-playback-state+playlist-read-private`;
// 		const loginUrl = `${SPOTIFY_LOGIN_URL}/authorize?client_id=${SPOTIFY_CLIENT_ID}&redirect_uri=${redirectUri}`;
// 		return {
// 			headers: {
// 				"content-type": "application/json; charset=utf-8",
// 				"cache-control":
// 					"no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
// 			},
// 			statusCode: 200,
// 			body: JSON.stringify({ user, loginUrl }),
// 		};
// 	}

// 	const testUser = { name: "Oliver Turner" };
// 	const scenarios = [
// 		{
// 			actual: await getLogin({ session: { user: testUser } }),
// 			expected: getUserResponse(testUser),
// 			desc: "Login returns expected response with user",
// 		},
// 		{
// 			actual: await getLogin({}),
// 			expected: getUserResponse(),
// 			desc: "Login returns expected response without user",
// 		},
// 	];

// 	t.plan(scenarios.length);
// 	for (const { actual, expected, desc } of scenarios) {
// 		t.deepEquals(actual, expected, desc);
// 	}
// });

test(`${testTitle}.getLoginUrl`, (t) => {
	const envVars = {
		SPOTIFY_LOGIN_URL: "https://a.b.com",
		SPOTIFY_CLIENT_ID: "a",
		SPOTIFY_LOGIN_REDIRECT: "b",
	};
	const actual = getLoginUrl(envVars);
	const expected =
		"https://a.b.com/authorize?client_id=a&redirect_uri=b&response_type=code&scope=user-top-read+user-modify-playback-state+playlist-read-private";
	const desc = "getLoginUrl matches";

	t.plan(1);
	t.equals(actual, expected, desc);
});

testEnv.down();
