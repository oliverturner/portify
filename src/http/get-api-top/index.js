/**
 * @typedef {import("@architect/functions").HttpRequest} HttpRequest
 *
 * @typedef {import("@typings/app").TrackItem} TrackItem
 * @typedef {import("@typings/app").TrackItemAudio} TrackItemAudio
 * @typedef {import("@typings/app").TimeRange} TimeRange
 */

const { http } = require('@architect/functions')
const { get } = require('tiny-json-http')

const { urlBuilder } = require('@architect/shared/utils')
const { getAudioData, processItemAudio } = require('@architect/shared/audio')

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
 * @param {*} req
 * @param {*} headers
 * @returns
 */
const getTop = async (req, headers = {}) => {
  const { limit = LIMIT, time_range = TIME_RANGE } = req.query
  const url = urlBuilder('/me/top/tracks', { time_range, limit })
  const topTrackRes = (await get({ url, headers })).body

  /** @type {Record<string, TrackItem>} */
  const trackItemDict = {}
  for (const item of topTrackRes.items) {
    trackItemDict[item.id] = processItem(item)
  }

  const trackItemIds = Object.keys(trackItemDict)
  const { audio_features } = (await getAudioData(trackItemIds)).body

  for (const itemAudio of audio_features) {
    const trackItem = trackItemDict[itemAudio.id]
    trackItem.audio = processItemAudio(itemAudio)
  }

  return trackItemDict
}

module.exports = {
  TIME_RANGE,
  LIMIT,
  getTop,
  handler: http.async(getTop),
}
