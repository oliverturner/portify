// @ts-nocheck

const test = require("tape");
const nock = require("nock");

const { getAlbum } = require("../src/views/get-album");
const { getTestEnv } = require("./helpers");
const { apiUrl, albumId } = require("./fixtures/spotify.json");
const expected = require("./fixtures/album.json");

const testTitle = "get-album";
const testEnv = getTestEnv(testTitle);

testEnv.up();

test(testTitle, async (t) => {
	const session = {};
	const pathParameters = { albumId };
	const queryStringParameters = {};

	nock(apiUrl)
		.get(`/albums/${albumId}`)
		.query(true)
		.replyWithFile(200, __dirname + "/fixtures/album-raw.json", {
			"Content-Type": "application/json",
		});

	nock(apiUrl)
		.get("/audio-features")
		.query(true)
		.replyWithFile(200, __dirname + "/fixtures/album-audio.json", {
			"Content-Type": "application/json",
		});

	const actual = await getAlbum({
		session,
		pathParameters,
		queryStringParameters,
	});

	t.plan(1);
	t.deepEquals(actual, expected, "Parsed output matches");
});

testEnv.down();
