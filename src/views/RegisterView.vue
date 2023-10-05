<template>
	<main class="register">
		<div
			class="register__background"
			role="img"
			aria-label="Background register image"
			ref="background"
			:style="{
				backgroundImage: `url(${backgroundImg})`,
				backgroundSize: `calc(100% + ${movementStrength * 2}px)`,
				'--bg-pos-x': backgroundPosition.x,
				'--bg-pos-y': backgroundPosition.y,
			}"
		></div>
		<section class="register__content">
			<RouterView></RouterView>
		</section>
	</main>
</template>

<script setup lang="ts">
import backgroundImage from '@/assets/images/background.jpg';

import { ref, reactive, computed } from 'vue';
import { useMouseInElement } from '@vueuse/core';

const background = ref<HTMLDivElement>();
const backgroundMouse = reactive(useMouseInElement(background));
const movementStrength = 50;

const backgroundPosition = computed(() => {
	const height = movementStrength / backgroundMouse.elementHeight;
	const width = movementStrength / backgroundMouse.elementWidth;

	const elX = backgroundMouse.x - backgroundMouse.elementHeight / 2;
	const elY = backgroundMouse.y - backgroundMouse.elementWidth / 2;

	const posX = width * elX * -1 - movementStrength;
	const posY = height * elY * -1 - movementStrength;

	return { x: posX + 'px ', y: posY + 'px' };
});

const backgroundImg = computed(() => backgroundImage);
</script>

<style lang="scss" scoped>
.register {
	$self: &;
	position: relative;
	height: 100vh;

	&__background {
		position: absolute;
		isolation: isolate;
		inset: 0;
		z-index: 0;

		width: 100vw;
		height: 100vh;

		background-position-x: var(--bg-pos-x);
		background-position-y: var(--bg-pos-y);
	}

	&__content {
		position: relative;
		z-index: 10;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
}
</style>
