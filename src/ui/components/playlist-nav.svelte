<script>
	import { playlists } from "../stores/api";

	$: console.log({ playlists: $playlists });
</script>

{#if $playlists}
	<ul class="playlists">
		{#each $playlists.items as playlist}
			<li>{playlist.name}</li>
		{/each}
	</ul>
{/if}

<style lang="scss">
	.playlists {
		overflow-y: auto;
		height: 100%;
		margin: 0;
		padding: 1rem;
	}
</style>
