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
			v-if="filled"
			d="M30 30C36.6274 23.3726 36.6274 12.6274 30 6C23.3726 -0.627418 12.6274 -0.627418 6 6C-0.627415 12.6274 -0.627417 23.3726 6 30C12.6274 36.6274 23.3726 36.6274 30 30Z"
			:fill="color"
		/>
		<path
			d="M24.5413 11.2686L14.4576 21.3524L11.4371 18.332C10.5484 17.4432 9.10812 17.4432 8.21933 18.332C7.33054 19.2208 7.33054 20.661 8.21933 21.5498L12.8481 26.1786C13.7369 27.0674 15.1772 27.0674 16.066 26.1786L27.7581 14.4865C28.6469 13.5977 28.6469 12.1574 27.7581 11.2686C26.8693 10.3799 25.4291 10.3799 24.5403 11.2686H24.5413Z"
			:fill="filled ? 'white' : color"
		/>
	</svg>
</template>

<script lang="ts" setup>
interface IProps {
	color?: string;
	filled?: boolean;
}

defineProps<IProps>();
</script>

<style scoped lang="scss"></style>
