<script>
	import { onMount } from "svelte";
	import { Router, Route } from "svelte-routing";

	import * as apiStores from "./stores/api";

	import AppNav from "./components/app-nav.svelte";
	import PlaylistNav from "./components/playlist-nav.svelte";

	import Top from "./routes/top-tracks.svelte";
	import Artist from "./routes/artist.svelte";
	import Playlist from "./routes/playlist.svelte";
	import Album from "./routes/album.svelte";

	/** @type {PortifyApi.RouteDataGeneric}*/
	export let routeData;

	const { user, playlists, ...storeDict } = apiStores;

	// Bootstrap app with embedded data on first load
	onMount(() => {
		// Global values
		user.set(routeData.user);
		playlists.set(routeData.playlists);
   
		// Route-specific values
		const routeStore = storeDict[routeData.routeId];
		if (routeStore) {
			routeStore.set(routeData.pageData);
		} else {
			console.warn(
				routeData.routeId,
				"trying to set data on non-existent store"
			);
		}
	});
</script>

<div class="app">
	<header class="app__header">
		<AppNav />
	</header>

	<div class="app__playlists">
		<PlaylistNav />
	</div>

	<main class="app__content">
		<Router>
			<Route path="/artists/:id" component={Artist} />
			<Route path="/albums/:id" component={Album} />
			<Route path="/playlists/:id" component={Playlist} />
			<Route component={Top} />
		</Router>
	</main>
</div>

<style lang="scss">
	.app {
		display: grid;
		grid-template-areas:
			"a a"
			"b c";
		grid-template-rows: auto 1fr;
		grid-template-columns: 20vw 1fr;

		overflow: hidden;
		max-width: var(--width-xxlarge);
		height: 100vh;
		margin: auto;
	}

	.app__header {
		grid-area: a;
		background-color: lightsalmon;
	}
	.app__playlists {
		grid-area: b;

		overflow: hidden;
		background-color: lightseagreen;
	}
	.app__content {
		grid-area: c;
		
		overflow: hidden;
		background-color: lightslategrey;
	}
</style>
