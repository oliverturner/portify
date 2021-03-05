/**
 * @param {string} [clientId]
 * @param {string} [clientSecret]
 * @returns
 */
function getTokenHeaders(clientId, clientSecret) {
  const clientToken = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  return {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Basic ${clientToken}`,
  };
}

/**
 * Negotiate the oAuth sequence
 *
 * @param {string} code
 * @param {NodeJS.ProcessEnv} envVars
 */
function makeSessionRequest(code, envVars) {
  const {
    SPOTIFY_CLIENT_ID: clientId,
    SPOTIFY_CLIENT_SECRET: clientSecret,
    SPOTIFY_LOGIN_URL: loginUrl,
    SPOTIFY_LOGIN_REDIRECT: redirect_uri,
  } = envVars;

  return {
    url: `${loginUrl}/api/token`,
    headers: getTokenHeaders(clientId, clientSecret),
    data: {
      code,
      redirect_uri,
      grant_type: "authorization_code",
    },
  };
}

module.exports = {
  makeSessionRequest,
};
