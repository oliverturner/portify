// @ts-nocheck

const test = require("tape");
const nock = require("nock");

const { getData } = require("../src/http/get-api-playlists");
const { apiUrl } = require("./fixtures/spotify.json");
const { getTestEnv } = require("./helpers");
const expected = require("./fixtures/playlists.json");

const testEnv = getTestEnv("get-api-playlists");

testEnv.up();

test("get-api-playlists", async (t) => {
	const session = {};
	const queryStringParameters = { limit: 3, offset: 5 };

	nock(apiUrl)
		.get("/me/playlists")
		.query(queryStringParameters)
		.replyWithFile(200, __dirname + "/fixtures/playlists-raw.json", {
			"Content-Type": "application/json",
		});

	const actual = await getData({ session, queryStringParameters });

	t.plan(1);
	t.deepEquals(actual, expected, "Parsed output matches");
});

testEnv.down();
