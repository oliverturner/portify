const ROOT_URL = 'https://api.spotify.com'
const API_VERSION = 'v1'

/**
 * @param {string} path
 * @param {Record<string, unknown>} params
 * @param {boolean} toString
 *
 * @returns {URL|string}
 */
function urlBuilder (path, params, toString = true) {
  const url = new URL(`${API_VERSION}${path}`, ROOT_URL)

  for (const [ key, val ] of Object.entries(params)) {
    url.searchParams.set(key, String(val))
  }

  return toString ? url.toString() : url
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
  ROOT_URL,
  API_VERSION,
  urlBuilder,
  filterProps,
}
