<script>
	import { links } from "svelte-routing";

	import { album } from "../stores/api";
	import TrackItem from "../components/track-item.svelte";

	export let location;
	export let id;

	console.log({
		location,
	});

	async function fetchData(id, location) {
		try {
			album.set(null);

			const res = await fetch(`/api/albums/${id}`);
			const data = res.ok ? await res.json() : Promise.reject(res);

			album.set(data);
		} catch (error) {
			console.warn({
				statusCode: error.statusCode,
				message: error.message,
			});
		}
	}

	$: fetchData(id, location);
</script>

{#if $album && $album.items}
	<section class="page fade-in">
		<header class="page__header">
			<h1 class="title">{$album.name}</h1>
		</header>

		<div class="page__content">
			<div class="info">
				<img src={$album.images["300"]} alt="cover art" />
			</div>
			<div class="trackitems" use:links>
				{#each $album.items as item}
					<TrackItem {item} compact={true} />
				{/each}
			</div>
		</div>
	</section>
{:else}
	<div class="page page--loading fade-in">
		<p class="title">loading...</p>
	</div>
{/if}
