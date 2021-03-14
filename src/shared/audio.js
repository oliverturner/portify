/**
 * @typedef {import("@typings/app").TrackItem} TrackItem
 * @typedef {import("@typings/app").TrackItemAudio} TrackItemAudio
 */

const { get } = require("tiny-json-http");

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
 * @param {Record<string, Portify.TrackItem>} trackItemDict
 * @param {{url:string, headers: any}} audioRequest
 */
async function addTrackAudio(trackItemDict, audioRequest) {
	const { audio_features } = (await get(audioRequest)).body;
	for (const itemAudio of audio_features) {
		const trackItem = trackItemDict[itemAudio.id];
		trackItem.audio = processItemAudio(itemAudio);
	}

	return trackItemDict;
}

/**
 * @param {Record<string, Portify.TrackItem>} trackItemDict
 * @param {Portify.MakeRequest} makeRequest
 */
async function injectAudio(trackItemDict, makeRequest) {
	const trackItemIds = Object.keys(trackItemDict);
	const audioRequest = makeRequest("/audio-features", { ids: trackItemIds });
	const tracks = await addTrackAudio(trackItemDict, audioRequest);

	return tracks;
}

module.exports = {
	addTrackAudio,
	injectAudio,
};
