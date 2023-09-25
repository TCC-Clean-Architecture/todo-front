<template>
	<Teleport to="#modals">
		<Transition name="modal-fade">
			<dialog class="modal" :class="$attrs.class" v-if="show">
				<div class="modal__backdrop"></div>
				<div class="modal__card" :style="{ width: width }">
					<slot name="header">
						<div class="modal__header">
							<slot name="title">
								<h2 v-if="title" class="modal__title" v-text="title"></h2>
							</slot>
							<slot name="close-button">
								<button class="modal__close" @click="show = false"><IconXMark /></button>
							</slot>
						</div>
					</slot>
					<div class="modal__content">
						<slot></slot>
					</div>
					<div class="modal__footer">
						<slot name="footer"></slot>
					</div>
				</div>
			</dialog>
		</Transition>
	</Teleport>
</template>

<script lang="ts" setup>
import IconXMark from '@/components/icons/IconXMark.vue';

import { watch } from 'vue';
import { useVModel } from '@vueuse/core';

interface IProps {
	modelValue: boolean;
	width?: string;
	title?: string;
}

const props = withDefaults(defineProps<IProps>(), {
	width: '500px',
	modelValue: false,
});

const emit = defineEmits<{
	(e: 'update:modelValue', value: boolean): void;
	(e: 'open'): void;
	(e: 'close'): void;
}>();

defineOptions({
	inheritAttrs: false,
});

const show = useVModel(props, 'modelValue', emit);

watch(
	show,
	async (bool) => {
		if (bool) emit('open');
		else emit('close');
	},
	{ immediate: true },
);
</script>

<style lang="scss" scoped>
.modal {
	$self: &;
	position: fixed;
	top: 0;
	z-index: 20;

	display: grid;
	place-items: center;

	width: 100vw;
	min-height: 100vh;

	background: transparent;
	border: none;

	&__backdrop {
		position: absolute;
		inset: 0;

		z-index: -1;

		background: rgba(0, 0, 0, 0.2);
	}

	&__card {
		display: flex;
		flex-direction: column;

		background-color: var(--clr-bg-soft);
		border-radius: 1rem;
		box-shadow: $elevation-2;
	}

	&__header {
		display: flex;
		padding-block-start: 0.5rem;
		padding-inline: 2rem 0.5rem;
	}

	&__close {
		margin-inline-start: auto;
		width: 1.75rem;
		height: 1.75rem;
		padding: 0.375rem;

		color: var(--clr-secondary);

		background-color: var(--clr-bg-soft-up);
		border-radius: 0.5rem;

		transition: background-color 150ms ease-in-out;

		&:hover {
			background-color: var(--clr-secondary-lightest);

			svg {
				scale: 1.1;
			}
		}

		svg {
			transition: scale 150ms ease-in-out;

			width: 100%;
			height: 100%;
		}
	}
}

.modal-fade-enter-from,
.modal-fade-leave-to {
	scale: 0;
	opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
	transition: all 250ms ease-in-out;
}
</style>
