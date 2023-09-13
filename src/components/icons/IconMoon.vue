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
			d="M19.6299 30C22.9086 30 25.9031 28.3862 27.887 25.7418C28.1805 25.3506 27.8605 24.7791 27.4069 24.8725C22.2496 25.9351 17.5136 21.6572 17.5136 16.025C17.5136 12.7806 19.1189 9.79724 21.7281 8.19088C22.1303 7.94327 22.0291 7.28359 21.5721 7.19227C20.9314 7.06446 20.2813 7.0001 19.6299 7C13.7623 7 9 12.144 9 18.5C9 24.8479 13.7548 30 19.6299 30Z"
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
