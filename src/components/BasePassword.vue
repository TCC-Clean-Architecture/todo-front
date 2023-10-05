<template>
	<BaseInput
		class="password__input"
		v-bind="props"
		:type="inputType"
		@update:model-value="$emit('update:modelValue', $event)"
	>
		<template #trailing-icon>
			<div class="password__eye" @select.prevent @click="togglePasswordType()">
				<IconEye :type="eyeType" :color="eyeColor" />
			</div>
		</template>
	</BaseInput>
</template>

<script lang="ts" setup>
import BaseInput from '@/components/BaseInput.vue';
import IconEye from '@/components/icons/IconEye.vue';

import { ref, computed } from 'vue';

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
	events: () => ({}),
});

defineEmits<{
	(e: 'update:modelValue', event: unknown): void;
}>();

const showPassword = ref<boolean>(false);

const inputType = computed(() => {
	return showPassword.value ? 'text' : 'password';
});
const eyeType = computed(() => {
	return showPassword.value ? 'open' : 'close';
});
const eyeColor = computed(() => {
	return showPassword.value ? '#1E2651' : '#B6B6B6';
});

const togglePasswordType = () => {
	showPassword.value = !showPassword.value;
};
</script>

<style scoped lang="scss">
.password {
	&__eye {
		display: grid;
		place-items: center;

		cursor: pointer;

		svg {
			$size: 1.125rem;

			width: $size;
			height: $size;

			transition: scale 100ms ease-in-out;
		}

		&:hover svg {
			scale: 1.1;
		}
	}
}
</style>
