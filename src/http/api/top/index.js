const { http } = require("@architect/functions");
const { get } = require("tiny-json-http");

const notation = require("../../../data/notation.json");

const ROOT_URL = "https://api.spotify.com";
const API_VERSION = "v1";
const TIME_RANGE = "short_term";
const LIMIT = 48;

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

/**
 * @param {string[]} ids
 * @returns { Promise<{body: {audio_features: SpotifyApi.AudioFeaturesObject[]}}> }
 */
function getAudioData(ids) {
  const headers = {};
  const url = urlBuilder("/audio-features", { ids });

  return get({ url, headers });
}

/**
 * @param {SpotifyApi.TrackObjectFull} item
 *
 * @returns {{
 *   id: string;
 *   artists: { id: string; name: string; }[];
 *   name: string;
 * }}
 */
function processItem(item) {
  const { artists: artistsRaw, id, name } = item;
  const artists = artistsRaw.map(({ id, name }) => ({ id, name }));

  return { id, artists, name };
}

/**
 * @param {SpotifyApi.AudioFeaturesObject} itemAudio
 *
 * @returns {{
 *   keys: { camelot: string; musical: string; };
 *   bpm: number;
 *   analysis_url: string;
 * }}
 */
function processItemAudio(itemAudio) {
  const { key, mode, tempo, analysis_url } = itemAudio;
  const bpm = Math.round(tempo);
  const modality = mode === 0 ? "minor" : "major";
  const keys = {
    camelot: notation.pitches[modality][key],
    musical: notation.tones[modality][key],
  };

  return { keys, bpm, analysis_url };
}

const getTop = async (req, headers = {}) => {
  const limit = req.query.limit || LIMIT;
  const time_range = req.query.time_range || TIME_RANGE;

  const url = urlBuilder("/me/top/tracks", { time_range, limit });
  const topTrackRes = (await get({ url, headers })).body;

  const trackItemDict = {};
  for (const item of topTrackRes.items) {
    trackItemDict[item.id] = processItem(item);
  }

  const trackItemIds = Object.keys(trackItemDict);
  const { audio_features } = (await getAudioData(trackItemIds)).body;

  for (const itemAudio of audio_features) {
    const trackItem = trackItemDict[itemAudio.id];
    trackItem.audio = processItemAudio(itemAudio);
  }

  return trackItemDict;
};

module.exports = {
  ROOT_URL,
  TIME_RANGE,
  LIMIT,
  getTop,
  //   handler: http.async(makeResponse(getTop)),
};
