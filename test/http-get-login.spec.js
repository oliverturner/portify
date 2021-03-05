const test = require("tape");

const { getTestEnv } = require("./helpers");
const { login, getLoginUrl } = require("../src/http/get-login");

const testEnv = getTestEnv("login");

testEnv.up();

test("getLoginUrl", (t) => {
  const envVars = {
    SPOTIFY_LOGIN_URL: "https://a.b.com",
    SPOTIFY_CLIENT_ID: "a",
    SPOTIFY_LOGIN_REDIRECT: "b",
  };
  const scopes = ["alpha", "beta", "gamma"];
  const input = getLoginUrl(envVars, scopes);
  const expected =
    "https://a.b.com/authorize?client_id=a&redirect_uri=b&response_type=code&scope=alpha+beta+gamma";
  const desc = "getLoginUrl matches";

  t.plan(1);
  t.equals(input, expected, desc);
});

testEnv.down();
