<template>
	<div
		class="layout"
		:style="{ 'grid-template-columns': `${collapsed ? '4rem' : '14rem'} minmax(0, 1fr)` }"
	>
		<TheSidebar class="layout__sidebar" v-model="collapsed" />
		<main class="layout__content">
			<RouterView />
		</main>
	</div>
</template>

<script setup lang="ts">
import TheSidebar from '@/components/TheSidebar.vue';

import { useSessionStorage } from '@vueuse/core';

const collapsed = useSessionStorage('sidebar-collapse', false);
</script>

<style lang="scss" scoped>
.layout {
	$header-h: 3.75rem;

	position: relative;
	min-height: 100vh;

	display: grid;

	transition: all 300ms ease-in-out;

	&__sidebar {
		position: sticky;
		top: 0;

		height: 100vh;

		z-index: 10;
	}

	&__content {
		margin-block: 2rem 1rem;
		margin-inline: 2rem;
	}
}
</style>
