<script>
	import { links } from "svelte-routing";

	import { playlists } from "../stores/app";

	$: console.log({ playlists: $playlists });
</script>

{#if $playlists}
	<ul class="playlists" use:links>
		{#each $playlists.items as playlist}
			<li><a href={playlist.href}>{playlist.name}</a></li>
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
