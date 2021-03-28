<script>
	/** @type {PortifyApi.TrackItemBase} */
	export let trackItem;
	export let compact = false;

	const { name } = trackItem;
</script>

<article class="trackitem" class:compact>
	<h1>{name}</h1>
	<a href="#fake" class="link">link</a>
</article>

<style lang="scss">
	.trackitem {
		background-color: lightcoral;

		&.compact {
			background-color: lightgoldenrodyellow;
		}
	}

	.link {
		background: #000;

		&:enter {
			background: #fff;
		}
	}
</style>
