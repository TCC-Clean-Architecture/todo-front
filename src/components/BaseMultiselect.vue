<template>
	<Multiselect
		:class="{
			[variantClass]: variantClass,
			[sizeClass]: sizeClass,
			'multiselect--focused': modelValue,
		}"
		:options="options"
		:model-value="modelValue"
		:multiple="multiple"
		:clear-on-select="false"
		:close-on-select="!multiple"
		:arrow="false"
		:track-by="trackBy"
		:label="label"
		:disabled="disabled"
		:open-direction="openDirection"
		select-label=""
		selected-label=""
		deselect-label=""
		:placeholder="placeholder"
		:loading="loading"
		@update:model-value="$emit('update:model-value', $event)"
		@close="$emit('close', $event)"
		@open="openWrapper"
	>
		<template #tag>
			<span></span>
		</template>
		<template #limit>
			<span></span>
		</template>
		<template #caret="{ toggle }">
			<span class="multiselect__search" @mousedown.prevent.stop="toggle">
				<IconChevron />
			</span>
		</template>
		<template #selectio="{ values, isOpen }">
			<span class="multiselect__single" v-if="values.length && !isOpen">
				{{ values.length }}
				{{ values.length > 1 ? selectionTitle[1] : selectionTitle[0] }}
			</span>
		</template>
		<template #noResult> Nenhuma opção encontrada </template>
		<template #noOptions> Nenhuma opção encontrada </template>
	</Multiselect>
</template>

<script lang="ts" setup>
import Multiselect from 'vue-multiselect';
import IconChevron from '@/components/icons/IconChevron.vue';

import { computed } from 'vue';

type TOpenDirections = 'bottom' | 'top';
type TSizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface IProps {
	options: unknown[];
	trackBy?: string;
	label?: string;
	loading?: boolean;
	multiple?: boolean;
	selectionTitle?: [string, string];
	openDirection?: TOpenDirections;
	placeholder?: string;
	modelValue?: unknown;
	variant?: string;
	disabled?: boolean;
	size?: TSizes;
}

const props = withDefaults(defineProps<IProps>(), {
	trackBy: 'value',
	label: 'text',
	selectionTitle: () => ['Valor', 'Valores'],
	openDirection: 'bottom',
	placeholder: 'Selecionar',
	size: 'md',
});

/* -- Emits -- */

const emit = defineEmits<{
	(e: 'open'): void;
	(e: 'wrapper-scroll', event: Event): void;
}>();

/* -- Computeds -- */

const variantClass = computed(() => {
	if (!props.variant) return '';
	return `multiselect--${props.variant}`;
});

const sizeClass = computed(() => {
	if (!['xs', 'sm', 'md', 'lg', 'xl'].includes(props.size)) return '';
	return `size--${props.size}`;
});

/* -- Methods -- */

const openWrapper = () => {
	emit('open');
	const contentWrapper = document.querySelector('.multiselect__content-wrapper')!;
	contentWrapper.addEventListener('scroll', (e) => {
		emit('wrapper-scroll', e);
	});
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style lang="scss">
.multiselect {
	$self: &;
	min-height: unset;

	font-size: 0.8rem;
	color: $c-gray-30;

	border-radius: 0.375rem;

	$sizes: (
		'xs': 1.5rem,
		'sm': 2rem,
		'md': 2.5rem,
		'lg': 3rem,
		'xl': 3.5rem,
	);

	$svg-sizes: (
		'xs': 0.5rem,
		'sm': 0.75rem,
		'md': 1rem,
		'lg': 1.25rem,
		'xl': 1.5rem,
	);

	$font-sizes: (
		'xs': 0.625rem,
		'sm': 0.75rem,
		'md': 0.875rem,
		'lg': 1.25rem,
		'xl': 1.5rem,
	);

	@each $key, $val in $sizes {
		&.size--#{$key} {
			height: $val;
			font-size: map-get($font-sizes, $key);

			#{$self}__search > svg {
				width: map-get($svg-sizes, $key);
			}
		}
	}

	&--default {
		&#{$self}--active,
		&#{$self}--focused {
			#{$self}__tags {
				background-color: $c-white;
				border-color: var(--clr-primary);
			}

			#{$self}__content-wrapper {
				border-color: var(--clr-primary);
			}

			&:hover {
				#{$self}__tags {
					background-color: $c-white;
					border-color: var(--clr-primary);
				}
			}
		}

		#{$self}__content-wrapper {
			#{$self}__option {
				background-color: $c-white;
				transition: background-color 200ms;

				&:hover {
					background-color: $c-lightest;
				}
				&--selected {
					background-color: $c-gray-95;
					font-weight: 500;
				}
			}
		}

		#{$self}__single {
			background: transparent;
		}

		#{$self}__input {
			color: $c-gray-30;
			background-color: $c-white;

			&::placeholder {
				color: $c-gray-70;
				font-weight: 500;
			}
		}

		#{$self}__placeholder {
			display: none;
			color: $c-gray-70;
			font-weight: 500;
		}

		#{$self}__tags {
			background-color: $c-lightest;
			border-color: $c-lightest;
		}

		&:hover {
			#{$self}__tags {
				background-color: $c-white;
				border-color: $c-gray-70;
			}
		}
	}

	&--dark-gray {
		color: $c-gray-40;

		#{$self}__single {
			background: transparent;
			font-weight: bold;
		}

		#{$self}__input {
			color: $c-gray-40;
			background-color: $c-gray-90;

			&::placeholder {
				color: $c-gray-40;
			}
		}

		#{$self}__tags {
			background-color: $c-gray-90;
			border-color: $c-gray-90;
		}
	}

	&--active {
		z-index: initial;

		#{$self}__search > svg {
			stroke: $c-gray-40;
			rotate: -180deg;
		}
	}

	&--disabled {
		background: transparent;

		#{$self}__select {
			background: transparent;
		}

		#{$self}__tags {
			background: $c-gray-95;
		}
	}

	&__tags {
		height: inherit;
		min-height: unset;

		padding: 0;
		padding-inline: 0.75rem 2.5rem;

		font-size: inherit;

		border-radius: inherit;

		transition:
			background-color 200ms,
			border-color 300ms;

		#{$self}__placeholder,
		#{$self}__input,
		#{$self}__single {
			margin: unset;
			padding: unset;

			height: 100%;

			font-size: inherit;
			line-height: initial;
		}
	}

	&__search {
		position: absolute;
		right: 1px;
		top: 0px;

		display: flex;
		align-items: center;
		justify-content: center;

		width: 40px;
		height: 100%;

		padding: 4px 8px;

		& > svg {
			width: 1rem;

			transition: rotate 200ms ease-in-out;
		}
	}

	&__placeholder {
		display: flex;
		align-items: center;
	}

	&__single {
		display: flex;
		align-items: center;

		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: inherit;

		background: transparent;
	}

	&__spinner {
		height: 95%;
		top: 50%;
		transform: translateY(-50%);
		border-top-right-radius: 5px;
		border-bottom-right-radius: 5px;

		&::after,
		&::before {
			border-top-color: var(--clr-primary);
		}
	}

	&__content-wrapper {
		max-height: 250px !important;
		font-size: inherit;
		z-index: 60;

		#{$self}__content {
			padding: 0;
		}

		#{$self}__option {
			&--selected {
				color: unset;
			}

			&--highlight {
				background: $c-gray-90;
				color: inherit;
			}
		}
	}
}
</style>
