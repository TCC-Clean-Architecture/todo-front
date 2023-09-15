<template>
	<div
		class="field"
		:class="{
			[variantClass]: true,
			'field--invalid': invalid,
			'field--focused': modelValue,
		}"
	>
		<div class="p-relative">
			<label
				v-if="label"
				:id="`${name}-label`"
				class="field__label"
				:style="{
					left: hasLeadingIcon ? '3rem' : undefined,
				}"
				:aria-label="name"
				:for="name"
			>
				<span v-text="label" />
				<span v-if="requirement" class="field__requirement"> ({{ requirement }})</span>
			</label>

			<div class="p-relative">
				<div v-if="hasLeadingIcon" class="field__leading-icon" aria-hidden="true">
					<slot name="leading-icon"></slot>
				</div>
				<input
					:value="modelValue"
					:id="name"
					class="field__input"
					:style="{
						'padding-inline-start': hasLeadingIcon ? '3rem' : undefined,
						'padding-inline-end': hasTrailingIcon ? '3rem' : undefined,
					}"
					:placeholder="showPlaceholder || !label || variant ? placeholder : undefined"
					:type="type"
					:name="name"
					:required="required"
					:disabled="disabled"
					autocomplete="off"
					:aria-labelledby="`${name}-label`"
					@input="onInputChange($event)"
					@focus="onFocus()"
					@blur="showPlaceholder = false"
					v-on="events"
				/>
				<div v-if="hasTrailingIcon" class="field__trailing-icon" aria-hidden="true">
					<slot name="trailing-icon"></slot>
				</div>
			</div>
		</div>

		<div v-if="feedback" class="field__feedback" :aria-describedby="name">
			<div
				class="field__feedback-bar"
				:style="{
					width: feedback?.width || '0%',
					'background-color': feedback?.color || '#9036aa',
				}"
			/>
		</div>
		<div v-if="helperText || feedback?.text" class="field__helper-text" :aria-describedby="name">
			<div
				v-if="feedback?.text"
				class="field__feedback-text"
				:style="{ color: feedback?.color || '#9036aa' }"
				v-text="feedback?.text"
			/>
			<div v-if="helperText?.success" class="field__success-text" v-text="helperText.success" />
			<div v-else-if="helperText?.error" class="field__error-text" v-text="helperText.error" />
			<div
				v-else-if="helperText?.info || typeof helperText === 'string'"
				class="field__info-text"
				v-text="helperText.info || helperText"
			/>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, computed, useSlots } from 'vue';
import { useVModel } from '@vueuse/core';

interface IFeedbackProp {
	width?: string;
	color?: string;
	text?: string;
}

interface IHelperTextProp {
	success?: string;
	error?: string;
	info?: string;
}

interface IProps {
	type?: string;
	modelValue?: unknown;
	name?: string;
	label?: string;
	placeholder?: string;
	feedback?: IFeedbackProp;
	helperText?: IHelperTextProp;
	events?: object;
	variant?: string;
	required?: boolean;
	optional?: boolean;
	showRequirement?: boolean;
	invalid?: boolean;
	disabled?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
	type: 'text',
});

/* -- emits -- */

const emit = defineEmits<{
	(e: 'update:modelValue', value: boolean): void;
}>();

/* -- Data -- */

const slots = useSlots();
const showPlaceholder = ref<boolean>(false);
const inputValue = useVModel(props, 'modelValue', emit);

/* -- Computeds -- */

const hasLeadingIcon = computed(() => {
	return slots['leading-icon'] || false;
});

const hasTrailingIcon = computed(() => {
	return slots['leading-icon'] || false;
});

const variantClass = computed(() => {
	if (!props.variant) return '';
	if (['outline', 'flat'].includes(props.variant)) return `field--${props.variant}`;
	return 'field--default';
});

const requirement = computed(() => {
	if (!props.showRequirement) return null;
	if (props.required) return 'Obrigatório';
	if (props.optional) return 'Opcional';
	return null;
});

const onInputChange = (e: Event) => {
	inputValue.value = (e.target as HTMLInputElement).value;
};

const onFocus = () => {
	setTimeout(() => {
		showPlaceholder.value = true;
	}, 100);
};
</script>

<style lang="scss" scoped>
.field {
	$self: &;
	position: relative;
	width: 100%;
	height: fit-content;

	&__label {
		position: absolute;
		left: 0.75rem;
		top: 50%;
		transform: translateY(-50%);

		display: flex;
		align-items: center;
		gap: 0.25rem;

		font-size: 0.875rem;
		font-weight: 500;
		text-align: left;
		color: $c-gray-70;

		border: 1px solid transparent;
		background-color: transparent;
		pointer-events: none;
		z-index: 1;

		transition: all 150ms ease-in-out;

		#{$self}__requirement {
			font-size: 0.625rem;
			font-weight: 400;
			font-style: italic;
		}
	}

	&__leading-icon {
		position: absolute;
		left: 1rem;
		top: 50%;

		display: flex;
		align-items: center;
		justify-content: center;

		transform: translateY(-50%);

		user-select: none;
	}

	&__input {
		height: 2.5rem;
		width: 100%;
		max-width: 100%;
		padding: 0.2rem 0.75rem 0.2rem;
		background-color: $c-lightest;
		border: 1px solid $c-lightest;
		color: $c-gray-30;
		border-radius: 6px;
		font-size: 0.875rem;
		outline: none;
		transition:
			background-color 200ms,
			border-color 300ms;

		&::placeholder {
			color: $c-gray-70;
			font-weight: 500;
		}
	}

	&__trailing-icon {
		position: absolute;
		right: 1rem;
		top: 50%;

		display: flex;
		align-items: center;
		justify-content: center;

		transform: translateY(-50%);

		user-select: none;
	}

	&__feedback {
		display: flex;
		align-items: center;

		height: 0.1875rem;
		margin-block-start: 0.375rem;
		background-color: $c-gray-90;
		border-radius: 0.25rem;

		user-select: none;

		#{$self}__feedback-bar {
			height: 0.1875rem;
			border-radius: 0.25rem;

			transition: width 150ms ease-in-out;
		}
	}

	&__helper-text {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;

		margin-block-start: 0.4rem;
		padding-inline: 0.25rem;

		font-size: 0.625rem;
		line-height: 0.75rem;
		font-weight: 400;
		color: $c-gray-40;

		#{$self}__feedback-text {
			align-self: center;
			font-weight: bold;
		}
	}

	&--default {
		&#{$self}--focused #{$self}__label,
		&:focus-within #{$self}__label {
			top: 0px;
			left: 8px !important;
			padding-inline: 0.25rem;

			font-size: 0.625rem;
			color: var(--clr-primary);

			background-color: $c-white;

			transition:
				left 150ms ease-out,
				top 150ms ease-out,
				font-size 150ms ease-out,
				background-color 150ms ease-out,
				color 150ms ease-out,
				padding 150ms ease-out;
		}

		&:hover {
			#{$self}__input {
				background-color: $c-white;
				border-color: $c-gray-70;
			}
		}

		&#{$self}--focused,
		&:focus,
		&:focus-within {
			#{$self}__input {
				background-color: $c-white;
				border-color: var(--clr-primary);
			}

			&:hover {
				#{$self}__input {
					background-color: $c-white;
					border-color: var(--clr-primary);
				}
			}
		}

		&#{$self}--invalid {
			#{$self}__input {
				border-color: $c-danger;
			}

			&#{$self}--focused,
			&:focus-within {
				#{$self}__input {
					border-color: $c-danger;
				}
				#{$self}__label {
					color: $c-danger !important;
				}

				&:hover {
					#{$self}__input {
						border-color: $c-danger;
					}
				}
			}

			&:hover {
				#{$self}__input {
					border-color: $c-danger;
				}
			}
		}
	}

	&--flat {
		#{$self}__label {
			position: relative;
			top: auto;
			left: auto;
			transform: unset;

			font-size: 0.75rem;
			font-weight: 500;
			color: $c-gray-40;
			margin-block-end: 0.375rem;
		}

		#{$self}__input {
			&:hover {
				background-color: $c-white;
				border-color: $c-gray-70;
			}
		}

		&:focus,
		&:focus-within {
			#{$self}__input {
				background-color: $c-white;
				border-color: $c-gray-70;
			}

			&:hover {
				#{$self}__input {
					background-color: $c-white;
					border-color: $c-gray-70;
				}
			}
		}

		&#{$self}--invalid {
			#{$self}__input {
				border-color: $c-danger;
			}

			&#{$self}--focused,
			&:focus-within {
				#{$self}__input {
					border-color: $c-danger;
				}

				&:hover {
					#{$self}__input {
						border-color: $c-danger;
					}
				}
			}
		}
	}

	&--outline {
		#{$self}__label {
			position: relative;
			top: initial;
			left: initial;
			transform: unset;

			margin-block-end: 0.375rem;

			font-size: 0.75rem;
			font-weight: 500;
			color: $c-gray-40;

			border: none;
		}

		#{$self}__input {
			background-color: $c-white;
			border-color: $c-gray-90;
		}

		&#{$self}--invalid {
			#{$self}__input {
				border-color: $c-danger;
			}
		}
	}

	.p-relative {
		position: relative;
	}
}
</style>
