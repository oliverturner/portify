/**
 * @typedef {typeof breakpoints} Breakpoints
 * @typedef {keyof Breakpoints} BreakpointKey
 */

/**
 * Produces an object of media queries from `breakpoints` suitable for use in
 * matchMedia queries in JS
 *
 * ```js
 * const matchMedia = {
 *   medium: (min-width: 768px),
 *   large:  (min-width: 960px),
 *   xlarge: (min-width: 1200px)
 * }
 * ```
 *
 * @param {Breakpoints} breakpoints
 *
 * @returns {Record<BreakpointKey, string>}
 */
function createMediaQueries(breakpoints) {
	/** @type {Record<string, string>} */
	const mediaQueries = {};
	for (const [k, v] of Object.entries(breakpoints)) {
		mediaQueries[k] = `(min-width: ${v}px)`;
	}

	return mediaQueries;
}

/**
 * Produces a series of @custom-media props for use in CSS
 *
 * ```scss
 * .app {
 *   @media (--mq-medium) { ... }
 *   @media (--mq-large)  { ... }
 *   @media (--mq-xlarge) { ... }
 * }
 * ```
 *
 * @param {Record<string, string>} mediaQueries
 *
 * @returns {Record<[`--mq-${BreakpointKey}`], string>}
 */
function createCustomMediaQueries(mediaQueries) {
	/** @type {Record<string, string>} */
	const customMedia = {};
	for (const [k, v] of Object.entries(mediaQueries)) {
		customMedia[`--mq-${k}`] = v;
	}

	return customMedia;
}

/**
 * Create width variables based on breakpoints:
 * - --width-medium: 768px;
 * - --width-large: 960px;
 *
 * @param {Breakpoints} breakpoints
 *
 * @returns {Record<[`--width-${BreakpointKey}`], string>}
 */
function createWidthProperties(breakpoints) {
	/** @type {Record<string, string>} */
	const customProperties = {};
	for (const [k, v] of Object.entries(breakpoints)) {
		customProperties[`--width-${k}`] = `${v}px`;
	}

	return customProperties;
}

const breakpoints = {
	small: 414,
	medium: 768,
	large: 960,
	xlarge: 1200,
};

const mediaQueries = createMediaQueries(breakpoints);

const widthProps = createWidthProperties(breakpoints);

module.exports = {
	breakpoints,
	mediaQueries,
	customMedia: createCustomMediaQueries(mediaQueries),
	customProperties: {
		...widthProps,
	},
};
