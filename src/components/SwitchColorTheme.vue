<template>
	<div
		class="switch-color-theme"
		:class="{ 'switch-color-theme--active': isDark }"
		@click="toggleDark()"
	>
		<input class="switch-color-theme__checkbox" type="checkbox" />
		<div class="switch-color-theme__wrapper">
			<Transition name="morph" mode="out-in">
				<IconMoon v-if="isDark" />
				<IconSun v-else />
			</Transition>
		</div>
	</div>
</template>

<script lang="ts" setup>
import IconSun from '@/components/icons/IconSun.vue';
import IconMoon from '@/components/icons/IconMoon.vue';

import { useDark, useToggle } from '@vueuse/core';

/* -- Data -- */
const isDark = useDark({ disableTransition: false });

/* -- Methods -- */
const toggleDark = useToggle(isDark);
</script>

<style lang="scss" scoped>
.switch-color-theme {
	$self: &;
	$height: 1.5rem;
	$width: 3rem;
	$padding: 0.125rem;

	position: relative;
	display: flex;
	justify-content: flex-start;
	align-items: center;

	height: $height;
	width: $width;

	padding: $padding;

	background-color: var(--clr-bg-soft-up);
	border-radius: 100vw;

	overflow: hidden;

	&--active {
		#{$self}__wrapper {
			$margin-transition: $width - $height;
			margin-inline-start: $margin-transition;
		}
	}

	&__checkbox {
		position: absolute;
		inset: 0;

		opacity: 0;
		cursor: pointer;
	}

	&__wrapper {
		aspect-ratio: 1/1;

		background-color: var(--clr-secondary);
		color: var(--clr-bg-soft);

		height: 100%;
		margin-inline-start: 0px;

		display: grid;
		place-items: center;

		border-radius: 100vw;

		transition: margin-inline-start 200ms ease-in-out;

		& > svg {
			width: 1rem;
			height: 1rem;
		}
	}

	.morph-enter-active,
	.morph-leave-active {
		transition: all 200ms ease-in-out;
	}

	.morph-enter,
	.morph-leave-to {
		transform: scale(0);
		opacity: 0;
	}
}
</style>
