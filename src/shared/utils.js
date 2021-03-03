const {
  SPOTIFY_API_URL: apiUrl = "https://local.portify.test",
  SPOTIFY_API_VERSION: apiVersion = "v0",
} = process.env;

/**
 * @param {{
 *   base?: string;
 *   path: string;
 *   params?: Record<string, unknown>;
 *   asObject?: boolean;
 * }} params
 *
 * @returns {URL|string}
 */
function buildUrl({ base = apiUrl, path, params = {}, asObject = false }) {
  const prefix = base === apiUrl ? apiVersion : "";
  const url = new URL(`${prefix}${path}`, base);

  for (const [ key, val ] of Object.entries(params)) {
    url.searchParams.set(key, String(val))
  }

  return asObject ? url : url.toString();
}

/**
 * Dispose of illicit keys from an object
 * @param {Record<string, unknown>} target
 * @param {string[]} [keys]
 *
 * @returns {Record<string, unknown>}
 */
function filterProps (target, keys = []) {
  /** @type {Record<string, unknown>} */
  const filtered = {}
  for (const key of keys) {
    filtered[key] = target[key]
  }

  return filtered
}

module.exports = {
  buildUrl,
  filterProps,
}
