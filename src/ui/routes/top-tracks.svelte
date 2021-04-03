<script>
	import { toptracks } from "../stores/api";

	export let location;

	// $: loading = $toptracks === null;
	// $: console.log({ location });

	async function fetchData(location) {
		// Don't delete bootstrap data
		// if (!$toptracks) return;

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

{#if $toptracks}
	<!-- content here -->
	<section class="page">
		<header>
			<h1 class="title">Top Tracks</h1>
		</header>
		<div class="content grid">
			{#if $toptracks}
				{#each $toptracks.items as item}
					<article>{item.name}</article>
				{/each}
			{:else}
				<p class="title">loading...</p>
			{/if}
		</div>
	</section>
{:else}
	<div class="grid loading">
		<p class="title">loading...</p>
	</div>
{/if}

<style lang="scss">
	.page {
		display: grid;
		grid-template-rows: auto 1fr;
		gap: 1rem;

		height: 100%;
	}

	.grid {
		display: grid;
		overflow-y: auto;
		padding: 1rem;

		&.loading {
			place-content: center;
		}
	}
</style>
