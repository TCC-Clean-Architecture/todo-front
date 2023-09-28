<template>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="36"
		height="36"
		viewBox="0 0 36 36"
		aria-hidden="true"
		role="img"
		fill="currentColor"
	>
		<path
			d="M15.3443 30.3188V21.9129H21.6486V30.3188C21.6486 31.2435 22.3579 32 23.2247 32H27.9529C28.8198 32 29.529 31.2435 29.529 30.3188V18.5506H32.2083C32.9333 18.5506 33.2801 17.5923 32.7284 17.088L19.5525 4.4287C18.9536 3.8571 18.0394 3.8571 17.4405 4.4287L4.26455 17.088C3.72868 17.5923 4.05966 18.5506 4.78465 18.5506H7.46398V30.3188C7.46398 31.2435 8.17321 32 9.04005 32H13.7683C14.6351 32 15.3443 31.2435 15.3443 30.3188Z"
		/>
	</svg>
</template>

<script lang="ts" setup>
interface IProps {
	color?: string;
}

defineProps<IProps>();
</script>

<style lang="scss" scoped>
svg {
	color: v-bind(color);
}
</style>
