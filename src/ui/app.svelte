<script>
	import { onMount } from "svelte";
	import { Router, Route } from "svelte-routing";

	import { user, options, playlists } from "./stores/app";
	import * as apiStores from "./stores/api";

	import AppNav from "./components/app-nav.svelte";
	import PlaylistNav from "./components/playlist-nav.svelte";

	import TopTracks from "./routes/top-tracks.svelte";
	import Artist from "./routes/artist.svelte";
	import Playlist from "./routes/playlist.svelte";
	import Album from "./routes/album.svelte";

	/** @type {PortifyApi.AppDataGeneric}*/
	export let appData;

	let pageTitle = "Portify";

	// Bootstrap app with embedded data on first load
	onMount(() => {
		// Global values
		user.set(appData.user);
		options.set(appData.options);
		// playlists.set(appData.playlists);

		// Route-specific values
		const routeStore = apiStores[appData.route.id];
		if (routeStore) {
			routeStore.set(appData.route.data);
		} else {
			console.warn(
				appData.route.id,
				"trying to set data on non-existent store"
			);
		}
	});

	function onPageUpdate(event) {
		pageTitle = `${event.detail.pageTitle} - Portify`;
	}
</script>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>

<div class="app">
	<header class="app__header">
		<AppNav />
	</header>

	<div class="app__playlists">
		<PlaylistNav initialData={appData.playlists} />
	</div>

	<main class="app__content">
		<Router>
			<Route path="/artists/:id" let:params>
				<Artist id={params.id} on:pageUpdate={onPageUpdate} />
			</Route>
			<Route path="/albums/:id" let:params>
				<Album id={params.id} on:pageUpdate={onPageUpdate} />
			</Route>
			<Route path="/playlists/:id" let:params>
				<Playlist id={params.id} on:pageUpdate={onPageUpdate} />
			</Route>
			<Route>
				<TopTracks on:pageUpdate={onPageUpdate} />
			</Route>
		</Router>
	</main>
</div>

<style>
	.app {
		display: grid;
		grid-template-areas:
			"a c d"
			"b c d";
		grid-template-rows: auto 1fr;
		grid-template-columns: max(20vw, 300px) 1fr auto;

		overflow: hidden;
		max-width: var(--width-xxlarge);
		height: 100vh;
		margin: auto;
	}

	.app__header {
		grid-area: a;
		/* background-color: lightsalmon; */
	}
	.app__playlists {
		grid-area: b;

		overflow: hidden;
		/* background-color: lightseagreen; */
	}
	.app__content {
		grid-area: c;

		overflow: hidden;
		/* background-color: lightslategrey; */
	}

	/* .app__user {
		grid-area: d;

	}*/
</style>
