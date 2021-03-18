// @ts-nocheck

const test = require("tape");
const nock = require("nock");

const { getData } = require("../src/http/get-api-artists-000artistId");
const { getTestEnv } = require("./helpers");
const { apiUrl, artistId } = require("./fixtures/spotify.json");
const expected = require("./fixtures/artist.json");

const testTitle = "get-api-artists-000artistId";
const testEnv = getTestEnv(testTitle);

testEnv.up();

const urlMap = {};
urlMap[""] = "artist.json";
urlMap["/albums"] = "albums.json";
urlMap["/artist"] = "artist.json";
urlMap["/top-tracks"] = "top-tracks.json";
urlMap["/related-artists"] = "related-artists.json";

for (const [endpoint, fileName] of Object.entries(urlMap)) {
	nock(apiUrl)
		.get(`/artists/${artistId}${endpoint}`)
		.query(true)
		.replyWithFile(200, __dirname + `/fixtures/artist-raw/${fileName}`, {
			"Content-Type": "application/json",
		});
}

test(testTitle, async (t) => {
	const req = {
		session: {},
		pathParameters: { artistId },
		queryStringParameters: {},
	};

	const actual = await getData(req);

	t.plan(1);
	t.deepEquals(actual, expected, "Parsed output matches");
});

testEnv.down();
