<template>
	<main class="login">
		<img class="login__background" :src="background" />
		<section class="login__content">
			<RouterView></RouterView>
		</section>
	</main>
</template>

<script setup lang="ts">
import backgroundImage from '@/assets/images/background.jpg';

import { computed } from 'vue';

const background = computed(() => backgroundImage);
</script>

<style lang="scss" scoped>
.login {
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
		object-fit: cover;
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
