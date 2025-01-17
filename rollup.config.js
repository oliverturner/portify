/* eslint-disable global-require */
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";

import css from "rollup-plugin-css-only";
import postcss from "rollup-plugin-postcss";
import livereload from "rollup-plugin-livereload";
import svelte from "rollup-plugin-svelte";
import replace from "@rollup/plugin-replace";
import { terser } from "rollup-plugin-terser";

import { preprocess } from "./svelte.config";

const production = !process.env.ROLLUP_WATCH;

export default [
	{
		input: "src/ui/global.css",
		output: { file: "public/build/global.css" },
		plugins: [postcss({ extract: true })],
	},
	{
		input: "src/ui/main.js",
		output: {
			sourcemap: true,
			format: "iife",
			name: "app",
			file: "public/build/bundle.js",
		},
		plugins: [
			replace({
				"process.env.NODE_ENV": process.env.NODE_ENV,
			}),

			svelte({
				preprocess,
				compilerOptions: {
					// enable run-time checks when not in production
					dev: !production,
					hydratable: true,
				},
			}),

			// we'll extract any component CSS out into
			// a separate file - better for performance
			css({ output: "bundle.css" }),

			// If you have external dependencies installed from
			// npm, you'll most likely need these plugins. In
			// some cases you'll need additional configuration -
			// consult the documentation for details:
			// https://github.com/rollup/plugins/tree/master/packages/commonjs
			resolve({
				browser: true,
				dedupe: ["svelte"],
			}),
			commonjs(),

			// In dev mode, call `npm run start` once
			// the bundle has been generated
			// !production && serve(),

			// Watch the `public` directory and refresh the
			// browser on changes when not in production
			!production && livereload({ watch: "public" }),

			// If we're building for production (npm run build
			// instead of npm run dev), minify
			production && terser(),
		],
		watch: {
			clearScreen: false,
		},
	},
];
