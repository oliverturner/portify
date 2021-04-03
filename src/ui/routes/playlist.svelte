<script>
	import { playlist } from "../stores/api";

	export let id;
	export let location;

	async function fetchData(id, location) {
		// Don't delete bootstrap data
		// if (!$playlist) return;

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
	<section class="page">
		<header class="page__header">
			<h1 class="title">{$playlist.name}</h1>
		</header>
		<div class="page__content grid">
			{#each $playlist.items as item}
				<article>{item.name}</article>
			{/each}
		</div>
	</section>
{:else}
	<div class="grid loading">
		<p class="title">loading...</p>
	</div>
{/if}

<style lang="scss">
	@keyframes fade-in {
		to {
			opacity: 1;
		}
	}
	.page {
		opacity: 0;
		animation: fade-in 1s forwards;

		display: grid;
		grid-template-rows: auto 1fr;
		gap: 1rem;

		height: 100%;
		padding: 1rem 0;
	}

	.page__header {
		padding: 0 1rem;
	}

	.title {
		font-size: var(--step-2);
	}

	.grid {
		display: grid;
		align-content: start;

		overflow-y: auto;
		padding: 0 1rem;

		&.loading {
			height: 100%;
			align-content: center;
			justify-content: center;
		}
	}
</style>
