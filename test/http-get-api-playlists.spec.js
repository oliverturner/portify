// @ts-nocheck

const test = require("tape");
const nock = require("nock");

const { getPlaylists } = require("../src/views/get-playlists");
const { apiUrl } = require("./fixtures/spotify.json");
const { getTestEnv } = require("./helpers");
const expected = require("./fixtures/playlists.json");

const testTitle = "get-playlists"
const testEnv = getTestEnv(testTitle);

testEnv.up();

test(testTitle, async (t) => {
	const session = {};
	const queryStringParameters = { limit: 3, offset: 5 };

	nock(apiUrl)
		.get("/me/playlists")
		.query(queryStringParameters)
		.replyWithFile(200, __dirname + "/fixtures/playlists-raw.json", {
			"Content-Type": "application/json",
		});

	const actual = await getPlaylists({ session, queryStringParameters });

	t.plan(1);
	t.deepEquals(actual, expected, "Parsed output matches");
});

testEnv.down();
