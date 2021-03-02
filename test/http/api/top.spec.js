const path = require("path");
const test = require("tape");
const sandbox = require("@architect/sandbox");
const nock = require("nock");

const { getTop } = require("../../../src/http/get-api-top");
const { ROOT_URL, API_VERSION } = require("../../../src/shared/utils");

const apiUrl = `${ROOT_URL}/${API_VERSION}`;

const fixturePath = __dirname + "../../../fixtures";
const topTracksResult = require(`${fixturePath}/top-tracks-result.json`);
const headers = {
  "Content-Type": "application/json",
};

test("Set up env", (t) => {
  t.plan(1);
  t.ok(sandbox, "sandbox loaded");
});

test("Mock request", async (t) => {
  t.plan(1);

  const tracksQuery = {
    limit: 1,
    time_range: "medium_term",
  };

  nock(apiUrl)
    .get(`/me/top/tracks`)
    .query(tracksQuery)
    .replyWithFile(200, path.resolve(fixturePath, "top-tracks.json"), headers);

  nock(apiUrl)
    .get(`/audio-features`)
    .query(true)
    .replyWithFile(
      200,
      path.resolve(fixturePath, "top-tracks-audio.json"),
      headers
    );

  const req = { query: tracksQuery };
  const res = await getTop(req);

  t.deepEqual(res, topTracksResult, "top tracks results match");
});
