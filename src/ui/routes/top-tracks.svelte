<script>
	import { createEventDispatcher } from "svelte";

	import { toptracks } from "../stores/api";
	import TrackItem from "../components/track-item.svelte";

	const dispatch = createEventDispatcher();
	let fetching = false;

	async function fetchData() {
		try {
			const res = await fetch(`/api/top`);
			const data = res.ok ? await res.json() : Promise.reject(res);
			toptracks.set(data);
			dispatch("pageUpdate", { pageTitle: "Top Tracks" });
		} catch (error) {
			console.warn({
				statusCode: error.statusCode,
				message: error.message,
			});
		}
	}

	$: fetching = fetchData();
</script>

{#await fetching}
	<div class="page page--loading fade-in">
		<p class="title">loading...</p>
	</div>
{:then}
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
{/await}

<style lang="scss">
</style>
