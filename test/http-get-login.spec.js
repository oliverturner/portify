// @ts-nocheck
const test = require("tape");

const { getTestEnv } = require("./helpers");
const { login, getLoginUrl } = require("../src/http/get-login");

const testTitle = "get-login"
const testEnv = getTestEnv(testTitle);

testEnv.up();

test(`${testTitle}.login`, async (t) => {
	const testUser = { name: "Oliver Turner" };
	const { body } = await login({ session: { user: testUser } });
	const { loginUrl, user } = JSON.parse(body);

	const url = new URL(loginUrl);
	const params = ["client_id", "redirect_uri", "response_type", "scope"];

	t.plan(params.length + 1);
	for (const param of params) {
		t.ok(url.searchParams.get(param), `URL contains ${param}`);
	}
	t.deepEqual(user, testUser, "User is returned");
});

test(`${testTitle}.getLoginUrl`, (t) => {
	const envVars = {
		SPOTIFY_LOGIN_URL: "https://a.b.com",
		SPOTIFY_CLIENT_ID: "a",
		SPOTIFY_LOGIN_REDIRECT: "b",
	};
	const scopes = ["alpha", "beta", "gamma"];
	const input = getLoginUrl(envVars, scopes);
	const expected =
		"https://a.b.com/authorize?client_id=a&redirect_uri=b&response_type=code&scope=alpha+beta+gamma";
	const desc = "getLoginUrl matches";

	t.plan(1);
	t.equals(input, expected, desc);
});

testEnv.down();
