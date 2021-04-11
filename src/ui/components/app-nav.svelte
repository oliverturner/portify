<script>
	import { link } from "svelte-routing";
</script>

<!-- {@debug $user} -->

<div class="appnav">
	<a href="/" class="title" use:link>Portify</a>
</div>

<style>
	.appnav {
		padding: 0.5rem;
		background: #000;
	}
	.title {
		font-size: var(--step-1);
		color: yellow;
	}
</style>
