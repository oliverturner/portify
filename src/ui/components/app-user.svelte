<script>
	import { user } from "../stores/app";
	import Toggle from "./toggle.svelte";
</script>

<div class="user">
	{#if $user}
		<img class="avatar" src={$user.imageUrl} alt={$user.display_name} />

		<div class="preferences">
			<Toggle name="theme" labelA="Dark" labelB="Light">Theme</Toggle>
			<Toggle name="notation" labelA="Camelot" labelB="Musical">
				Key notation
			</Toggle>
		</div>
	{/if}

	<form class="logout" action="/logout" method="POST">
		<button class="title">log out</button>
	</form>
</div>

<style lang="scss">
	.user {
		display: grid;

		height: 100%;
		background: var(--bg-dark);
		color: #ccc;
	}

	.avatar {
		--wh: 3rem;

		width: var(--wh);
		margin: var(--s6) auto 0;

		aspect-ratio: 1;
		object-fit: cover;
		border-radius: 3rem;

		@supports not (aspect-ratio: 1) {
			height: var(--wh);
		}
	}

	.preferences {
		display: grid;
		gap: var(--s6);
		align-content: start;

		padding: var(--s6);
	}

	.logout {
		margin-top: auto;
		padding: var(--s2);
		text-align: center;
		background: #000;
		
		& button {
			font-size: 0.8rem;
			letter-spacing: 2px;
		}
	}
</style>
