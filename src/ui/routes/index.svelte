<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch, session, context }) {
		const url = `http://localhost:3333/api/playlists`;
		const res = await fetch(url);

		if (res.ok) {
			return {
				props: {
					article: await res.text(),
				},
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`),
		};
	}
</script>

<script>
	console.log({ article: $$props.article });
	import Counter from "$lib/Counter.svelte";
</script>

<main>
	<h1>Hello world!</h1>

	<Counter />

	<p>
		Visit <a href="https://svelte.dev">svelte.dev</a> to learn how to build Svelte
		apps.
	</p>
</main>

<style lang="scss">
</style>
