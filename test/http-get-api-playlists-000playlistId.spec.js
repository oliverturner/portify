// @ts-nocheck

const test = require("tape");
const nock = require("nock");

const { getPlaylist } = require("../src/http/get-api-playlists-000playlistId");
const { getTestEnv } = require("./helpers");
const playlistJson = require("./fixtures/playlist.json");
const { apiUrl } = require("./fixtures/spotify.json");

const testEnv = getTestEnv("getPlaylists");

testEnv.up();

test("getPlaylist", async (t) => {
	const session = {};
	const pathParameters = { playlistId: "6qmun8EA2LO1d5QNApjX7u" };
	const queryStringParameters = {};

	nock(apiUrl)
		.get("/playlists/6qmun8EA2LO1d5QNApjX7u")
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

	const playlists = await getPlaylist({
		session,
		pathParameters,
		queryStringParameters,
	});

	t.plan(1);
	t.deepEquals(playlists, playlistJson, "Parsed output matches");
});

testEnv.down();
