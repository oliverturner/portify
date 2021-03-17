// @ts-nocheck

const test = require("tape");
const nock = require("nock");

const { getData } = require("../src/http/get-api-albums-000albumId");
const { getTestEnv } = require("./helpers");
const { apiUrl, albumId } = require("./fixtures/spotify.json");
const expected = require("./fixtures/album.json");

const testEnv = getTestEnv("api-albums-000albumId");

testEnv.up();

test("api-albums-000albumId", async (t) => {
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

	const actual = await getData({
		session,
		pathParameters,
		queryStringParameters,
	});

	t.plan(1);
	t.deepEquals(actual, expected, "Parsed output matches");
});

testEnv.down();
