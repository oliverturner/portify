const path = require("path");
const test = require("tape");
const sandbox = require("@architect/sandbox");
const nock = require("nock");

const { getTop } = require("../src/http/get-api-top");

const apiUrl = "https://api.spotify.com/v1";
const topTracksResponse = require(`./fixtures/top-tracks.json`);
const topTracksAudioResponse = require(`./fixtures/top-tracks-audio.json`);
const topTracksResult = require(`./fixtures/top-tracks-result.json`);
const headers = {
  "Content-Type": "application/json",
};

test("Set up env", async (t) => {
  t.plan(1);
  await sandbox.start();
  t.ok(true, "started");
});

test("Mock request", async (t) => {
  t.plan(1);

  const tracksQuery = {
    limit: 1,
    time_range: "medium_term",
  };

  nock(apiUrl)
    .get(`/me/top/tracks`)
    // .query(tracksQuery)
    .query(true)
    .reply(200, topTracksResponse);

  nock(apiUrl)
    .get(`/audio-features`)
    .query(true)
    .reply(200, topTracksAudioResponse);

  const req = { query: tracksQuery };
  const res = await getTop(req);

  t.deepEqual(
    res,
    topTracksResult,
    "Top tracks have audio added and format matches spec"
  );
});

test("Shut down sandbox", async (t) => {
  t.plan(1);
  let result = await sandbox.end();
  t.equal(result, "Sandbox successfully shut down");
});
