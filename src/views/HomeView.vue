<template>
	<div
		class="layout"
		:style="{ 'grid-template-columns': `${collapsed ? '4rem' : '14rem'} minmax(0, 1fr)` }"
	>
		<TheSidebar class="layout__sidebar" v-model="collapsed" />
		<HelloWorld msg="You did it!" />
	</div>
</template>

<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue';
import TheSidebar from '@/components/TheSidebar.vue';

import { useStorage } from '@vueuse/core';

const collapsed = useStorage('sidebar-collapse', false, sessionStorage);
</script>

<style lang="scss" scoped>
.layout {
	$header-h: 3.75rem;
	$layout-gap: 2rem;

	position: relative;
	min-height: 100vh;

	display: grid;
	gap: $layout-gap;

	transition: all 300ms ease-in-out;

	&__sidebar {
		position: sticky;
		height: 100vh;

		z-index: 10;
	}
}
</style>
