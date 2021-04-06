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
		<header class="page__header">
			<h1 class="title">{$playlist.name}</h1>
		</header>
		<div class="page__content">
			{#if $playlist.isCollection}
				<div class="info">
					<img src={$playlist.imageUrl} alt="cover art" />
				</div>
			{/if}
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
	.info {
		display: grid;
		grid-auto-flow: column;
		grid-template-columns: 96px 1fr;
		gap: var(--s2);
		align-items: end;
	}
</style>
