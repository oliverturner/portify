/**
 * @typedef {import("@typings/app").TrackItemAudio} TrackItemAudio
 */

const { get } = require('tiny-json-http')

const { urlBuilder } = require('./utils')
const notation = require('./notation.json')

/**
 * @param {string[]} ids
 * @returns { Promise<{body: {audio_features: SpotifyApi.AudioFeaturesObject[]}}> }
 */
function getAudioData (ids) {
  const headers = {}
  const url = urlBuilder('/audio-features', { ids })

  return get({ url, headers })
}

/**
 * @param {SpotifyApi.AudioFeaturesObject} itemAudio
 * @returns {TrackItemAudio}
 */
function processItemAudio (itemAudio) {
  const { key, mode, tempo, analysis_url } = itemAudio
  const bpm = Math.round(tempo)
  const modality = mode === 0 ? 'minor' : 'major'
  const keys = {
    camelot: notation.camelot[modality][key],
    musical: notation.musical[modality][key],
  }

  return { keys, bpm, analysis_url }
}

module.exports = {
  getAudioData,
  processItemAudio,
}
