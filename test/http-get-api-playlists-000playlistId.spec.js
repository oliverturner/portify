// @ts-nocheck

const test = require("tape");
const nock = require("nock");

const { getPlaylist } = require("../src/http/get-api-playlists-000playlistId");
const { getTestEnv } = require("./helpers");
const { apiUrl, playlistId } = require("./fixtures/spotify.json");
const expected = require("./fixtures/playlist.json");

const testEnv = getTestEnv("getPlaylist");

testEnv.up();

test("getPlaylist", async (t) => {
	const session = {};
	const pathParameters = { playlistId };
	const queryStringParameters = {};

	nock(apiUrl)
		.get(`/playlists/${playlistId}`)
		.query(true)
		.replyWithFile(200, __dirname + "/fixtures/playlist-raw.json", {
			"Content-Type": "application/json",
		});

	nock(apiUrl)
		.get("/audio-features")
		.query(true)
		.replyWithFile(200, __dirname + "/fixtures/playlist-audio.json", {
			"Content-Type": "application/json",
		});

	const input = await getPlaylist({
		session,
		pathParameters,
		queryStringParameters,
	});

	t.plan(1);
	t.deepEquals(input, expected, "Parsed output matches");
});

testEnv.down();
