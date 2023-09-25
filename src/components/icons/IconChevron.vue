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
			d="M16.4871 25.4142C17.3239 26.1953 18.6828 26.1953 19.5196 25.4142L32.3724 13.4165C33.2092 12.6354 33.2092 11.3669 32.3724 10.5858C31.5356 9.80473 30.1767 9.80473 29.34 10.5858L18 21.1713L6.66005 10.5921C5.82327 9.81097 4.46435 9.81097 3.62758 10.5921C2.79081 11.3732 2.79081 12.6417 3.62758 13.4228L16.4804 25.4204L16.4871 25.4142Z"
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
