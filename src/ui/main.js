import App from './app.svelte';

const app = new App({
	target: document.querySelector("main"),
	props: {
		name: 'world'
	}
});

export default app;