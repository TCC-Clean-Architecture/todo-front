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
			d="M13.8094 7.76055L13.5 8.375H9.375C8.61445 8.375 8 8.98945 8 9.75C8 10.5105 8.61445 11.125 9.375 11.125H25.875C26.6355 11.125 27.25 10.5105 27.25 9.75C27.25 8.98945 26.6355 8.375 25.875 8.375H21.75L21.4406 7.76055C21.2086 7.29219 20.7316 7 20.2117 7H15.0383C14.5184 7 14.0414 7.29219 13.8094 7.76055ZM25.875 12.5H9.375L10.2859 27.0664C10.3547 28.1535 11.257 29 12.3441 29H22.9059C23.993 29 24.8953 28.1535 24.9641 27.0664L25.875 12.5Z"
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
