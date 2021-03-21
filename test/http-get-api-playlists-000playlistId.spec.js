// @ts-nocheck

const test = require("tape");
const nock = require("nock");

const { getPlaylist } = require("../src/views/get-playlist");
const { getTestEnv } = require("./helpers");
const { apiUrl, playlistId } = require("./fixtures/spotify.json");
const expected = require("./fixtures/playlist.json");

const testTitle = "get-playlist";
const testEnv = getTestEnv(testTitle);

testEnv.up();

test(testTitle, async (t) => {
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

	const actual = await getPlaylist({
		session,
		pathParameters,
		queryStringParameters,
	});

	t.plan(1);
	t.deepEquals(actual, expected, "Parsed output matches");
});

testEnv.down();
