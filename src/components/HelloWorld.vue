<template>
	<div class="greetings">
		<h1 class="green">{{ msg }}</h1>
		<IconAngles />
		<h3>
			You’ve successfully created a project with
			<a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
			<a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>. What's next?
		</h3>
	</div>
</template>

<script setup lang="ts">
import IconAngles from '@/components/icons/IconAngles.vue';

defineProps<{
	msg: string;
}>();
</script>

<style lang="scss" scoped></style>
