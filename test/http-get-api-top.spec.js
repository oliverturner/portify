const test = require("tape");
const sandbox = require("@architect/sandbox");
const nock = require("nock");

const { getTop } = require("../src/http/get-api-top");
const { getTestEnv } = require("./helpers");

const apiUrl = "https://api.spotify.com/v1";
const topTracksResponse = require(`./fixtures/top-tracks.json`);
const topTracksAudioResponse = require(`./fixtures/top-tracks-audio.json`);
const topTracksResult = require(`./fixtures/top-tracks-result.json`);
const headers = {
  "Content-Type": "application/json",
};

const testEnv = getTestEnv("get-api-top");

testEnv.up();

test("Mock request", async (t) => {
  t.plan(1);

  const tracksQuery = {
    limit: "1",
    time_range: "medium_term",
  };

  nock(apiUrl)
    .get(`/me/top/tracks`)
    // TODO fix test so that Nock reads parsed values
    // .query(tracksQuery)
    .query(true)
    .reply(200, topTracksResponse);

  nock(apiUrl)
    .get(`/audio-features`)
    // TODO fix test so that Nock reads parsed values
    .query(true)
    .reply(200, topTracksAudioResponse);

  const req = { queryStringParameters: tracksQuery };
  const input = await getTop(req);
  const expected = {
    status: 200,
    body: JSON.stringify(topTracksResult),
  }

  t.deepEqual(input, expected, "Top tracks have audio added and format matches spec");
});

testEnv.down();
