<script>
	import { toptracks } from "../stores/api";
	import TrackItem from "../components/track-item.svelte";

	export let location;

	// $: loading = $toptracks === null;
	// $: console.log({ location });

	async function fetchData(location) {
		try {
			toptracks.set(null);

			const res = await fetch(`/api/top`);
			const data = res.ok ? await res.json() : Promise.reject(res);

			console.log({ data });

			toptracks.set(data);
		} catch (error) {
			console.warn({
				statusCode: error.statusCode,
				message: error.message,
			});
		}
	}

	$: fetchData(location);
</script>

{#if $toptracks && $toptracks.items}
	<!-- content here -->
	<section class="page fade-in">
		<header class="page__header">
			<h1 class="title">Top Tracks</h1>
		</header>
		<div class="page__content">
			<div class="trackitems">
				{#each $toptracks.items as item}
					<TrackItem {item} />
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

</style>
