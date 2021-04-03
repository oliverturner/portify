<script>
	import { link } from "svelte-routing";

	import { user } from "../stores/app";
</script>

<!-- {@debug $user} -->

<div class="appnav">
	<a href="/" class="title" use:link>Portify</a>

	{#if $user}
		<div class="user">
			<img class="avatar" src={$user.imageUrl} alt={$user.display_name} />
			<form action="/logout" method="POST"><button>log out</button></form>
		</div>
	{/if}
</div>

<style>
	.appnav {
		display: flex;
		justify-content: space-between;
		align-items: center;

		padding: 0.5rem;
	}
	.title {
		font-size: var(--step-1);
	}

	.user {
		display: flex;
	}

	.avatar {
		width: 3rem;
		aspect-ratio: 1;
		object-fit: cover;
		border-radius: 3rem;
	}
</style>
