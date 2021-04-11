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
		<h3 class="title"><a href={item.href}>{name}</a></h3>
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
		background-color: var(--bg-dark);
		color: var(--bg-dark-text);

		&.compact {
			background-color: var(--bg-dark);
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

	.title {
		font-size: var(--step-0);
	}

	.artist {
		display: inline-block;

		&::after {
			content: ",";
			margin-right: var(--s1);
			text-decoration: none;
		}

		&:last-child::after {
			content: "";
			margin: 0;
		}
	}
</style>
