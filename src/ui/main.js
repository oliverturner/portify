import App from "./app.svelte";

const target = document.querySelector("main") || document.body;

/**
 * Extract and parse the embedded data
 * @param {string} id
 */
function getEmbeddedData(id) {
	/** @type {HTMLScriptElement|null} */
	const dataEl = document.querySelector(id)
	return dataEl ? JSON.parse(dataEl.innerText) : null;
}

const app = new App({
	target,
	props: getEmbeddedData("#data"),
});

export default app;
