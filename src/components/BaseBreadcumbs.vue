<template>
	<nav class="breadcrumbs" role="navigation" aria-label="breadcrumbs">
		<ol class="breadcrumbs__list">
			<li class="breadcrumbs__item">Page</li>
			<div class="breadcrumbs__divider">/</div>
			<div class="breadcrumbs__item">Lists</div>
			<div class="breadcrumbs__divider">/</div>
			<li class="breadcrumbs__item">
				<RouterLink :to="link" aria-current="page">{{ listId }}</RouterLink>
			</li>
		</ol>
	</nav>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();

const listId = computed(() => {
	return route.params.id as string;
});

const link = computed(() => `/lists/${listId.value}`);
</script>

<style lang="scss" scoped>
.breadcrumbs {
	$self: &;
	position: relative;

	&__list {
		display: flex;
		align-items: center;
		gap: 0.25rem;

		list-style: none;
	}

	&__divider {
		color: var(--clr-primary-light);
	}

	&__item,
	&__item > a {
		color: var(--clr-primary-light);
		font-size: 0.875rem;
		font-weight: 500;
	}

	&__item:hover > a {
		text-decoration: underline;
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
