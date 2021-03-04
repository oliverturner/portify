/**
 * @typedef {import("@architect/functions").HttpRequest} HttpRequest
 * @typedef {import("@architect/functions").HttpHandler} HttpHandler
 *
 * @typedef {import("@typings/app").TrackItem} TrackItem
 * @typedef {import("@typings/app").TrackItemAudio} TrackItemAudio
 * @typedef {import("@typings/app").TimeRange} TimeRange
 */

const { http } = require('@architect/functions')
const { get } = require('tiny-json-http')

const { getApiUrl } = require("@architect/shared/utils");
const { addTrackAudio } = require("@architect/shared/audio");

/** @type {TimeRange} */
const TIME_RANGE = 'short_term'
const LIMIT = 48

/**
 * @param {SpotifyApi.TrackObjectFull} item
 * @returns {TrackItem}
 */
function processItem (item) {
  const { artists: artistsRaw, id, name } = item
  const artists = artistsRaw.map(({ id, name }) => ({ id, name }))

  return { id, artists, name }
}

/**
 * @type {HttpHandler}
 */
const getTop = async (req, headers = {}) => {
  const { limit = LIMIT, time_range = TIME_RANGE } =
    req.queryStringParameters || {};

  const topTrackRes = (
    await get({
      url: getApiUrl("/me/top/tracks", { time_range, limit }),
      headers,
    })
  ).body;

  /** @type {Record<string, TrackItem>} */
  const trackItemDict = {}
  for (const item of topTrackRes.items) {
    trackItemDict[item.id] = processItem(item)
  }

  return addTrackAudio(trackItemDict, headers);
};

module.exports = {
  TIME_RANGE,
  LIMIT,
  getTop,
  handler: http.async(getTop),
}
