// @ts-nocheck

const test = require("tape");
const nock = require("nock");

const { getArtist } = require("../src/views/get-artist");
const { getTestEnv } = require("./helpers");
const { apiUrl, artistId } = require("./fixtures/spotify.json");
const expected = require("./fixtures/artist.json");

const testTitle = "get-artist";
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

	const actual = await getArtist(req);

	t.plan(1);
	t.deepEquals(actual, expected, "Parsed output matches");
});

testEnv.down();
