const postcssPseudoEnter = require("postcss-pseudo-class-enter");
const postcssInset = require("postcss-inset");
const postcssNesting = require("postcss-nesting");
const postCssCustomMedia = require("postcss-custom-media");
const postcssCustomProperties = require("postcss-custom-properties");
const cssnano = require("cssnano");
const atImport = require("postcss-import");

const { customMedia, customProperties } = require("./src/ui/theme.js");

/**
 * @param {boolean} isProd
 * @returns {Transformer[]}
 */
function getPlugins(isProd) {
	const plugins = [
		atImport({ root: "src/ui/global.css" }),
		postcssNesting(),
		postCssCustomMedia({ importFrom: { customMedia } }),
		postcssCustomProperties({
			importFrom: { customProperties },
			preserve: true,
			exportTo: "./public/build/props.css",
		}),
		postcssInset(),
		postcssPseudoEnter(),
	];

	if (isProd) {
		return plugins.concat([cssnano({ preset: "advanced" })]);
	}

	return plugins;
}

module.exports = {
	plugins: getPlugins(process.env.NODE_ENV === "production"),
};
