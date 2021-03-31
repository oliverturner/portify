/**
 * Extract and parse the embedded data
 * @param {string} id
 */
export function getEmbeddedData(id) {
	/** @type {HTMLScriptElement|null} */
	const dataEl = document.querySelector(id);
	return dataEl ? JSON.parse(dataEl.innerText) : null;
}
