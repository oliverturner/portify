<script>
	import { toptracks } from "../stores/api";

	export let location;

	$: loading = $toptracks === null;
	$: console.log({ location });
</script>

<section class="page">
	<header>
		<h1 class="title">Top Tracks</h1>
	</header>
	<div class="content grid" class:loading>
		{#if $toptracks}
			{#each $toptracks.items as item}
				<article>{item.name}</article>
			{/each}
		{:else}
			loading...
		{/if}
	</div>
</section>

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
