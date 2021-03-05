/**
 * @typedef {import("@architect/functions").HttpHandler} HttpHandler
 * @typedef {import("@architect/functions").HttpRequest} HttpRequest
 * @typedef {import("@architect/functions").HttpResponse} HttpResponse
 */

const { http } = require("@architect/functions");
const { getLoginUrl } = require("@architect/shared/utils");

const defaultSession = { user: undefined };

/**
 *
 * @param {HttpRequest} req
 * @returns {Promise<HttpResponse>}
 */
/** @type {HttpHandler} */
const login = async (req) => {
  const { user } = req.session || defaultSession;

  const {
    SPOTIFY_CLIENT_ID: client_id = "",
    SPOTIFY_LOGIN_URL: base = "",
    SPOTIFY_LOGIN_REDIRECT: redirect_uri = "",
  } = process.env;

  const scopes = [
    "playlist-read-private",
    "user-top-read",
    "user-modify-playback-state",
  ];

  const loginURL = getLoginUrl({ base, client_id, redirect_uri, scopes });

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
