<script>
	import { user } from "../stores/api";
</script>

<!-- {@debug $user} -->

<div class="appnav">
	<h1>Portify</h1>
	<nav>
		{#if $user}
			<img src={$user.imageUrl} alt={$user.display_name} />
			<form action="/logout" method="POST"><button>log out</button></form>
		{/if}
	</nav>
</div>
