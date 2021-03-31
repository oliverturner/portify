<script>
	import { Router, Route } from "svelte-routing";

	import Top from "./routes/top.svelte";
	import Playlist from "./routes/playlist.svelte";

	export let user;
	export let pageData;
	export let playlists;

	console.log({ user, pageData, playlists });

	let url = "";
</script>

<Router {url}>
	<nav />

	<main>
		<Route path="/playlists/:id" component={Playlist} />
		<Route component={Top} />
	</main>
</Router>

<style lang="scss">
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;

		@media (min-width: 640px) {
			max-width: none;
		}
	}
</style>
