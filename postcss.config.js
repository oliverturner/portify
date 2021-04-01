const postcssPseudoEnter = require("postcss-pseudo-class-enter");
const postcssPresetEnv = require("postcss-preset-env");
const postcssInset = require("postcss-inset");
const cssnano = require("cssnano");

const { customMedia, customProperties } = require("./src/ui/theme.js");

console.log({ customProperties });

function getPlugins(isProd) {
	const plugins = [
		postcssPresetEnv({
			features: {
				// "nesting-rules": true,
				"custom-selectors": true,
				"custom-media-queries": { importFrom: { customMedia } },
				"custom-properties": {
					importFrom: ["./src/ui/theme.js"],
					exportTo: "./public/build/props.css",
					preserve: true,
				},
			},
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
