/**
 * @typedef {import("@architect/functions").HttpHandler} HttpHandler
 * @typedef {import("@architect/functions").HttpRequest} HttpRequest
 * @typedef {import("@architect/functions").HttpResponse} HttpResponse
 */

const { http } = require("@architect/functions");
const { buildUrl } = require("@architect/shared/utils");

const {
  SPOTIFY_ACCOUNTS_URL: base = "",
  SPOTIFY_CLIENT_ID: client_id = "",
  SPOTIFY_LOGIN_REDIRECT: redirect_uri = "",
} = process.env;

const scopes = [
  "playlist-read-private",
  "user-top-read",
  "user-modify-playback-state",
];

const loginURL = buildUrl({
  base,
  path: "/authorize",
  params: {
    client_id,
    redirect_uri,
    response_type: "code",
    scope: scopes.join(" "),
  },
});

const defaultSession = { user: undefined };

/**
 * 
 * @param {HttpRequest} req 
 * @returns {Promise<HttpResponse>}
 */
/** @type {HttpHandler} */
const login = async (req) => {
  const { user } = req.session || defaultSession;

  return {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control":
        "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
    },
    statusCode: 200,
    body: JSON.stringify({ user, loginURL }),
  };
};

module.exports = {
  handler: http.async(login),
};
