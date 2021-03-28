const sveltePreprocess = require("svelte-preprocess");

const preprocess = sveltePreprocess({
	scss: { renderSync: true },
	postcss: true,
});

module.exports = {
	preprocess,
};
