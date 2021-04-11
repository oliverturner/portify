<script>
	import { links } from "svelte-routing";
	import { useMachine } from "@xstate/svelte";

	import { observeScroll } from "../actions/observe-scroll";
	import { infiniteScrollMachine } from "../machines/infinite-scroll";

	export let initialData = {
		items: [],
		limit: 0,
		prev: null,
		next: null,
		offset: 0,
		total: 0,
	};

	const machine = infiniteScrollMachine(initialData);
	const { state, send } = useMachine(machine);
</script>

<div class="container" use:observeScroll={{ send }}>
	<nav class="playlists" use:links>
		{#each $state.context.items as playlist (playlist.id)}
			<a href={playlist.href}>{playlist.name}</a>
		{/each}
	</nav>
</div>

<style lang="scss">
	.container {
		overflow-y: auto;
		height: 100%;
		margin: 0;
		padding: 1rem;
	}
	.playlists {
		display: grid;
		align-content: start;
		gap: var(--s1);

		& a {
			padding: var(--s2);
			text-decoration: none;
			background-color: var(--bg-dark);
			color: var(--bg-dark-text);

			&:hover {
				color: var(--bg-dark-text--hover);
			}
		}
	}
</style>
