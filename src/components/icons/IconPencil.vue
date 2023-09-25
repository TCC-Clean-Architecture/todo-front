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
			d="M7 24.6739V28.389C7 28.7311 7.26885 29 7.61103 29H11.3261C11.4849 29 11.6438 28.9389 11.7538 28.8167L25.0986 15.4841L20.5159 10.9014L7.18331 24.234C7.0611 24.3562 7 24.5028 7 24.6739ZM28.6425 11.9401C29.1192 11.4635 29.1192 10.6937 28.6425 10.2171L25.7829 7.35745C25.3063 6.88085 24.5365 6.88085 24.0599 7.35745L21.8235 9.59381L26.4062 14.1765L28.6425 11.9401Z"
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
