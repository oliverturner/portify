<script>
	/** @type {PortifyApi.TrackItem} */
	export let item;
	export let compact = false;

	const { name } = item;
</script>

<article class="track" class:compact>
	{#if compact === false}
		<img class="track__cover" src={item.images["300"]} alt="cover art" />
	{/if}
	<div class="track__content">
		<h3 class="title">{name}</h3>
		<div class="artists">
			{#each item.artists as artist}
				<a href={`/artists/${artist.id}`} class="artist">{artist.name}</a>
			{/each}
		</div>
	</div>
</article>

<style lang="scss">
	.track {
		display: flex;

		&.compact {
			background-color: lightgoldenrodyellow;
		}
	}

	.track__cover {
		width: 33%;

		aspect-ratio: 1;
		object-fit: cover;
	}

	.track__content {
		padding: var(--s2);
	}

	.artist {
		display: inline-block;

		&:enter {
			background: #fff;
		}
	}
</style>
