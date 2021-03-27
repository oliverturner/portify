const sveltePreprocess = require("svelte-preprocess");
const node = require("@sveltejs/adapter-node");
const pkg = require("./package.json");

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: sveltePreprocess(),
	kit: {
		// By default, `npm run build` will create a standard Node app.
		// You can create optimized builds for different platforms by
		// specifying a different adapter
		adapter: node(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: "#svelte",

		files: {
			assets: "public",
			lib: "src/ui/lib",
			routes: "src/ui/routes",
			serviceWorker: "src/ui/service-worker",
			setup: "src/ui/setup",
			template: "src/ui/app.html",
		},

		paths: {
			assets: "/_static",
			base: "",
		},

		prerender: {
			crawl: false,
			pages: ["/", "/login"], // TODO <- remove "/" if possible
		},

		vite: {
			ssr: {
				noExternal: Object.keys(pkg.dependencies || {}),
			},
		},
	},
};
