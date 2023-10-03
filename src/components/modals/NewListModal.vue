<template>
	<BaseModal class="new-list-modal" v-model="show" @close="resetModal">
		<template #title>
			<h2 class="new-list-modal__title">Criar nova lista</h2>
		</template>
		<div class="new-list-modal__content">
			<p class="new-list-modal__description">Defina um nome para lista que será criada</p>
			<form class="new-list-modal__form" @submit.prevent>
				<BaseInput v-model="form.name" type="text" name="name" variant="outline" label="Nome" />
				<div class="new-list-modal__actions">
					<button class="new-list-modal__create" @click="onSave()">Criar</button>
					<button class="new-list-modal__cancel" @click="show = false">Cancelar</button>
				</div>
			</form>
		</div>
	</BaseModal>
</template>

<script lang="ts" setup>
import BaseModal from '@/components/BaseModal.vue';
import BaseInput from '@/components/BaseInput.vue';

import { reactive } from 'vue';
import { useVModel } from '@vueuse/core';
import { useListsStore } from '@/stores/lists';

interface IProps {
	modelValue: boolean;
	callback?: (id: string) => void;
}

const props = withDefaults(defineProps<IProps>(), {
	modelValue: false,
});

const emit = defineEmits<{
	(e: 'update:modelValue', value: boolean): void;
}>();

interface IForm {
	name: string | undefined;
}

const form: IForm = reactive({
	name: undefined,
});

const show = useVModel(props, 'modelValue', emit);
const listsStore = useListsStore();

const closeModal = () => {
	show.value = false;
};

const resetModal = () => {
	form.name = undefined;
};

const onSave = () => {
	if (!form.name) return;
	const body = {
		name: form.name,
	};
	listsStore.CREATE_LIST(body).then((list) => {
		closeModal();
		if (props.callback) props.callback(list._id);
	});
};
</script>

<style lang="scss" scoped>
.new-list-modal {
	$self: &;
	&__title {
		margin-block-start: 1rem;
		color: var(--clr-primary);
	}
	&__content {
		display: flex;
		flex-direction: column;

		padding-inline: 2rem;

		#{$self}__description {
			margin-block-end: 1rem;
			color: var(--clr-primary-lighter);
		}

		#{$self}__form {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
		}
	}

	&__actions {
		display: flex;
		justify-content: center;
		gap: 0.5rem;

		padding-block: 2rem;
	}

	&__create {
		height: 40px;
		min-width: 140px;
		padding-inline: 1.5rem;

		background-color: var(--clr-secondary);
		border-radius: 100vw;

		color: var(--clr-text-inverse-1);
		font-weight: 600;

		transition: background-color 200ms ease-in-out;

		&:hover {
			background-color: var(--clr-secondary-dark);
		}
	}

	&__cancel {
		height: 40px;
		min-width: 140px;
		padding-inline: 1.5rem;

		border-radius: 100vw;

		color: var(--clr-text-1);
		font-weight: 600;

		transition: background-color 200ms ease-in-out;

		&:hover {
			background-color: var(--clr-gray-lightest);
		}
	}
}

.field {
	position: relative;

	display: flex;
	flex-direction: column;

	width: 100%;
	height: fit-content;

	&__label {
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
	&__textarea {
		width: 100%;
		max-width: 100%;
		padding: 0.5rem 0.75rem 0.5rem;

		color: $c-gray-30;
		font-size: 0.875rem;
		font-family: 'DM Sans';

		background-color: var(--clr-bg-soft);
		border: 1px solid $c-gray-90;
		border-radius: 0.375rem;
		outline: none;
		resize: none;

		transition:
			background-color 200ms,
			border-color 300ms;
	}
}
</style>
@/stores/lists
