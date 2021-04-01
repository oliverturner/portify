<script>
	import { playlists } from "../stores/api";

	console.log({ playlists: $playlists });
</script>

{#each $playlists.items as playlist}
	<li>{playlist.name}</li>
{/each}
