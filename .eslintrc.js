module.exports = {
	env: {
		node: true,
		es6: true,
		browser: true,
	},
	extends: ["eslint:recommended", "plugin:node/recommended"],
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: "module",
	},
	rules: {
		"no-unused-vars": ["error", { args: "none" }],
		"node/no-extraneous-require": [
			"error",
			{
				allowModules: ["@architect/views", "@architect/shared"],
			},
		],
	},
	plugins: ["svelte3"],
	overrides: [
		{
			files: ["**/*.svelte"],
			processor: "svelte3/svelte3",
			settings: { "svelte3/ignore-styles": () => true },
		},
	],
};
