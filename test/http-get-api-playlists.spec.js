// @ts-nocheck

const test = require("tape");
const nock = require("nock");

const { getPlaylists } = require("../src/http/get-api-playlists");
const { getTestEnv } = require("./helpers");
const playlistsJson = require("./fixtures/playlists.json");

const testEnv = getTestEnv("getPlaylists");

testEnv.up();

test("getPlaylists", async (t) => {
	const session = {};
	const queryStringParameters = { limit: 3, offset: 5 };

	nock("https://api.spotify.com/v1")
		.get("/me/playlists")
		.query(queryStringParameters)
		.replyWithFile(200, __dirname + "/fixtures/playlists-raw.json", {
			"Content-Type": "application/json",
		});

	const playlists = await getPlaylists({ session, queryStringParameters });

	t.plan(1);
	t.deepEquals(playlists, playlistsJson, "Parsed output matches");
});

testEnv.down();
