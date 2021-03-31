import App from "./app.svelte";
import { getEmbeddedData } from "./utils";

const target = document.querySelector("#app") || document.body;
const props = getEmbeddedData("#data");

console.log({ props });

const app = new App({
	target,
	props,
	hydrate: true,
});

export default app;
