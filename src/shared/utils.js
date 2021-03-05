/**
 * @param {{
 *   base: string;
 *   path: string;
 *   prefix?: string;
 *   params?: Record<string, unknown>;
 * }} params
 *
 * @returns {string}
 */
function buildUrl({ base, path, prefix = "", params = {} }) {
  const url = new URL(`${prefix}${path}`, base);

  for (const [key, val] of Object.entries(params)) {
    url.searchParams.set(key, String(val));
  }

  return url.toString();
}

/**
 * @param {string} path
 * @param {Record<string, unknown>} params
 *
 * @returns {string}
 */
function getApiUrl(path, params) {
  const {
    SPOTIFY_API_URL: base = "",
    SPOTIFY_API_VERSION: prefix = "",
  } = process.env;

  return buildUrl({ base, prefix, path, params });
}

/**
 * @param {{
 *   base: string, 
 *   client_id: string, 
 *   redirect_uri: string, 
 *   scopes: string[]
 * }} args
 *
 * @returns {string}
 */
function getLoginUrl({ base, client_id, redirect_uri, scopes }) {
  return buildUrl({
    base,
    path: "/authorize",
    params: {
      client_id,
      redirect_uri,
      response_type: "code",
      scope: scopes.join(" "),
    },
  });
}

/**
 * Dispose of illicit keys from an object
 * @param {Record<string, unknown>} target
 * @param {string[]} [keys]
 *
 * @returns {Record<string, unknown>}
 */
function filterProps(target, keys = []) {
  if (keys.length === 0) return target;

  /** @type {Record<string, unknown>} */
  const filtered = {};
  for (const key of keys) {
    filtered[key] = target[key];
  }

  return filtered;
}

module.exports = {
  buildUrl,
  getApiUrl,
  getLoginUrl,
  filterProps,
};
