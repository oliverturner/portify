<script>
	import { onMount } from "svelte";
	import { Router, Route } from "svelte-routing";

	import { user, playlists } from "./stores/api";

	import Top from "./routes/top.svelte";
	import Artist from "./routes/artist.svelte";
	import Playlist from "./routes/playlist.svelte";
	import Album from "./routes/album.svelte";

	import AppNav from "./components/app-nav.svelte";
	import PlaylistNav from "./components/playlists.svelte";

	// import "./global.scss";

	export let routeData;

	let url = "";

	onMount(() => {
		// Bootstrap app with embedded data on first load
		console.log({ routeData });

		user.set(routeData.user);
		playlists.set(routeData.playlists);
	});
</script>

<div class="app">
	<AppNav />
	<PlaylistNav />
	<Router {url}>
		<main>
			<Route path="/artists/:id" component={Artist} />
			<Route path="/albums/:id" component={Album} />
			<Route path="/playlists/:id" component={Playlist} />
			<Route component={Top} />
		</main>
	</Router>
</div>

<style lang="scss">
	main {
		max-width: var(--width-large);
		margin: 0 auto;
		padding: 1em;
		text-align: center;
		background-color: lightcoral;

		@media (--mq-medium) {
			background-color: aquamarine;
		}
	}
</style>
