const test = require("tape");
const nock = require("nock");

const { getData } = require("../src/http/get-api-top");
const { getTestEnv } = require("./helpers");

const { apiUrl } = require("./fixtures/spotify.json");
const topTracksResponse = require(`./fixtures/top-tracks-raw.json`);
const topTracksAudioResponse = require(`./fixtures/top-tracks-audio.json`);
const expected = require(`./fixtures/top-tracks.json`);

const testEnv = getTestEnv("get-api-top");

testEnv.up();

test("get-api-top", async (t) => {
	t.plan(1);

	// TODO: return a paged object
	const tracksQuery = {
		limit: "1",
		time_range: "medium_term",
	};

	nock(apiUrl).get(`/me/top/tracks`).query(true).reply(200, topTracksResponse);

	nock(apiUrl)
		.get(`/audio-features`)
		.query(true)
		.reply(200, topTracksAudioResponse);

	const session = { access_token: "f4k3-4cc355-t0k3n" };
	const req = { session, queryStringParameters: tracksQuery };
	const actual = await getData(req);

	t.deepEquals(actual, expected, "Parsed output matches");
});

testEnv.down();
