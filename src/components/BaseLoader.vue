<template>
	<div
		class="loader"
		:class="{
			[variantClass]: true,
			'loader--center': center,
			'loader--fixed': fixed,
			'loader--floating': floating,
		}"
	>
		<div
			class="loader__spinner"
			:style="{
				height: size + 'px',
				'border-width': size / 10 + 'px',
			}"
		></div>
	</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

/* -- Props -- */

interface Props {
	variant?: string;
	center?: boolean;
	fixed?: boolean;
	floating?: boolean;
	size?: number;
}

const props = withDefaults(defineProps<Props>(), {
	center: false,
	fixed: false,
	floating: false,
	size: 20,
});

/* -- Computeds -- */

const variantClass = computed(() => {
	if (!props.variant) return 'loader--primary';
	return `loader--${props.variant}`;
});
</script>

<style lang="scss" scoped>
.loader {
	$self: &;
	position: relative;
	width: fit-content;

	&--center {
		display: grid;
		place-items: center;
		width: 100%;
		height: 100%;
	}

	&--fixed {
		display: grid;
		place-items: center;

		width: 100%;
		height: calc(60vh - 20rem);

		border-radius: 0.375rem;
		background: $c-gray-98;
	}

	&--floating {
		position: absolute;
		inset: 0;
	}

	&__spinner {
		aspect-ratio: 1/1;

		border-style: solid;
		border-bottom-color: transparent;
		border-radius: 100vw;

		animation: spin 600ms linear infinite;
	}

	&--primary #{$self}__spinner {
		border-color: $c-primary;
		border-bottom-color: transparent;
	}

	&--secondary #{$self}__spinner {
		border-color: $c-secondary;
		border-bottom-color: transparent;
	}

	&--white #{$self}__spinner {
		border-color: $c-white;
		border-bottom-color: transparent;
	}
}
</style>
