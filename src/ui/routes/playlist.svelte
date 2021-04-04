<script>
	import { links } from "svelte-routing";

	import { playlist } from "../stores/api";
	import TrackItem from "../components/track-item.svelte";

	export let id;
	export let location;

	async function fetchData(id, location) {
		try {
			playlist.set(null);

			const res = await fetch(`/api/playlists/${id}`);
			const data = res.ok ? await res.json() : Promise.reject(res);

			playlist.set(data);
		} catch (error) {
			console.warn({
				statusCode: error.statusCode,
				message: error.message,
			});
		}
	}

	$: fetchData(id, location);
</script>

{#if $playlist && $playlist.items}
	<section class="page fade-in">
		{#if $playlist.isCollection}
			<header class="page__header page__header--collection">
				<img src={$playlist.items[0].images["300"]} alt="cover art" />
				<h1 class="title">{$playlist.name}</h1>
			</header>
		{:else}
			<header class="page__header">
				<h1 class="title">{$playlist.name}</h1>
			</header>
		{/if}
		<div class="page__content">
			<div class="trackitems" use:links>
				{#each $playlist.items as item}
					<TrackItem {item} compact={$playlist.isCollection} />
				{/each}
			</div>
		</div>
	</section>
{:else}
	<div class="page page--loading fade-in">
		<p class="title">loading...</p>
	</div>
{/if}

<style lang="scss">
	.page__header--collection {
		display: grid;
		grid-auto-flow: column;
		grid-template-columns: 96px 1fr;
		gap: var(--s2);
		align-items: end;
	}
</style>
