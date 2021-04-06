<script>
	export let name;
	export let labelA;
	export let labelB;

	const toggleA = `${name}-${labelA}`;
	const toggleB = `${name}-${labelB}`;
</script>

<div class="toggle">
	<p><slot /></p>
	<div class="switch">
		<input
			class="switch__input switch__input--a"
			id={toggleA}
			{name}
			type="radio"
			checked="checked"
		/>
		<label class="switch__label switch__label--a" for={toggleA}>{labelA}</label>

		<input
			class="switch__input switch__input--b"
			id={toggleB}
			{name}
			type="radio"
		/>
		<label class="switch__label switch__label--b" for={toggleB}>{labelB}</label>

		<span class="indicator">
			<span class="indicator__thumb" />
		</span>
	</div>
</div>

<style lang="scss">
	$wh: 12px;

	.toggle {
		display: grid;
		gap: var(--s2);
	}

	.switch {
		display: grid;
		gap: var(--s1) var(--s2);
		grid-template-areas:
			"c-a a"
			"c-b b";
		grid-template-columns: auto 1fr;
	}

	.switch__input {
		opacity: 0;
		margin: 1px 1px 0 0;
		cursor: pointer;
		z-index: 1;
	}

	.switch__input--a {
		grid-area: c-a;
	}

	.switch__input--b {
		grid-area: c-b;
	}

	.switch__label {
		cursor: pointer;
		line-height: 1;

		transition: opacity 0.25s;
		opacity: 0.35;

		:checked + & {
			opacity: 0.75;
		}

		:focus + & {
			outline: 1px solid blue;
		}

		&.switch__label--a {
			grid-area: a;
		}

		&.switch__label--b {
			grid-area: b;
		}
	}

	.indicator {
		$border-w: 1px;
		$border-w2: $border-w * 2;
		$width: $wh + $border-w2;

		grid-column: 1;
		grid-row: 1 / -1;
		align-content: center;

		position: relative;
		width: $width;
		margin: 1.5px 0;
		border: 1px solid #555;
		border-radius: $width;
		background: #333;
	}

	.indicator__thumb {
		position: absolute;
		left: 0;
		top: 0;

		transition: 0.25s all;

		display: block;
		width: $wh;
		height: $wh;
		border-radius: $wh;
		background: var(--bg-dark);

		input ~ input:checked ~ .indicator & {
			top: calc(100% - #{$wh});
		}
	}
</style>
