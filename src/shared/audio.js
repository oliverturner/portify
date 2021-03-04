/**
 * @typedef {import("@typings/app").TrackItem} TrackItem
 * @typedef {import("@typings/app").TrackItemAudio} TrackItemAudio
 */

const { get } = require("tiny-json-http");

const { getApiUrl } = require("./utils");
const notation = require("./notation.json");

/**
 * @param {SpotifyApi.AudioFeaturesObject} itemAudio
 * @returns {TrackItemAudio}
 */
function processItemAudio(itemAudio) {
  const { key, mode, tempo, analysis_url } = itemAudio;
  const bpm = Math.round(tempo);
  const modality = mode === 0 ? "minor" : "major";
  const keys = {
    camelot: notation.camelot[modality][key],
    musical: notation.musical[modality][key],
  };

  return { keys, bpm, analysis_url };
}

/**
 * Inject audio_features into TrackItems
 *
 * @param {Record<string, TrackItem>} trackItemDict
 * @param {Record<string, unknown>} headers
 *
 * @returns {Promise<Record<string, TrackItem>>}
 */
async function addTrackAudio(trackItemDict, headers) {
  const trackItemIds = Object.keys(trackItemDict);
  const { audio_features } = (
    await get({
      url: getApiUrl("/audio-features", { ids: trackItemIds }),
      headers,
    })
  ).body;

  for (const itemAudio of audio_features) {
    const trackItem = trackItemDict[itemAudio.id];
    trackItem.audio = processItemAudio(itemAudio);
  }

  return trackItemDict;
}

module.exports = {
  addTrackAudio,
};
