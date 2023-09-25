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
			fill-rule="evenodd"
			clip-rule="evenodd"
			d="M17.9997 4C18.9974 4 19.8062 4.80878 19.8062 5.80645V30.1935C19.8062 31.1912 18.9974 32 17.9997 32C17.002 32 16.1933 31.1912 16.1933 30.1935V5.80645C16.1933 4.80878 17.002 4 17.9997 4Z"
		/>
		<path
			fill-rule="evenodd"
			clip-rule="evenodd"
			d="M4 18C4 17.0023 4.80878 16.1936 5.80645 16.1936H30.1935C31.1912 16.1936 32 17.0023 32 18C32 18.9977 31.1912 19.8065 30.1935 19.8065H5.80645C4.80878 19.8065 4 18.9977 4 18Z"
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
