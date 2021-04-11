/**
 * @param {HTMLDivElement} node
 * @param {import("xstate").Interpreter} scrollService
 *
 * @returns {void}
 */
export function observeScroll(node, scrollService) {
	const sentinel = node.appendChild(document.createElement("div"));

	function onScroll(entries) {
		if (entries[0].intersectionRatio < 1) return;

		node.dispatchEvent(new CustomEvent("scrollEndReached"));
		scrollService.send({ type: "SCROLL_TO_BOTTOM" });
	}

	const observer = new IntersectionObserver(onScroll, {
		root: node,
		rootMargin: "400px",
	});

	observer.observe(sentinel);

	return {
		destroy() {
			observer.disconnect();
		},
	};
}
