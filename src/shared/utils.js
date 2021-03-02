const ROOT_URL = "https://api.spotify.com";
const API_VERSION = "v1";

/**
 * @param {string} path
 * @param {Record<string, unknown>} params
 * @param {boolean} toString
 * @returns {URL|string}
 */
function urlBuilder(path, params, toString = true) {
  const url = new URL(`${API_VERSION}${path}`, ROOT_URL);

  for (const [key, val] of Object.entries(params)) {
    url.searchParams.set(key, String(val));
  }

  return toString ? url.toString() : url;
}

module.exports = {
  ROOT_URL,
  API_VERSION,
  urlBuilder,
};
