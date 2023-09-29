<template>
	<BaseModal class="new-task-modal" v-model="show" @open="getTodo" @close="resetModal">
		<template #title>
			<h2 class="new-task-modal__title" v-text="componentInfo.title"></h2>
		</template>
		<div class="new-task-modal__content">
			<p class="new-task-modal__description" v-text="componentInfo.description"></p>
			<form class="new-task-modal__form" @submit.prevent>
				<BaseInput v-model="form.title" type="text" name="name" variant="outline" label="Título" />
				<div class="field">
					<label
						id="input-description-label"
						class="field__label"
						aria-label="input-description"
						for="input-description"
					>
						Descrição
					</label>
					<textarea
						class="field__textarea"
						v-model="form.description"
						aria-labelledby="input-description-label"
						name="input-description"
						id="input-description"
						rows="5"
					></textarea>
				</div>
				<div class="field">
					<label
						id="input-description-label"
						class="field__label"
						aria-label="input-description"
						for="input-description"
					>
						Status
					</label>
					<BaseMultiselect v-model="form.status" :options="options.status" />
				</div>
				<div class="new-task-modal__actions">
					<button
						class="new-task-modal__create"
						@click="onSave()"
						v-text="componentInfo.button"
					></button>
					<button class="new-task-modal__cancel" @click="show = false">Cancelar</button>
				</div>
			</form>
		</div>
	</BaseModal>
</template>

<script lang="ts" setup>
import BaseModal from '@/components/BaseModal.vue';
import BaseInput from '@/components/BaseInput.vue';
import BaseMultiselect from '@/components/BaseMultiselect.vue';

import { reactive, computed, toValue } from 'vue';
import { useRoute } from 'vue-router';
import { useVModel } from '@vueuse/core';
import { useTodosStore } from '@/stores/todos';
import getAvailableStatus from '@/utils/getAvailableStatus';

interface IProps {
	modelValue: boolean;
	callback?: () => void;
	id?: string;
}

const props = withDefaults(defineProps<IProps>(), {
	modelValue: false,
});

const emit = defineEmits<{
	(e: 'update:modelValue', value: boolean): void;
}>();

interface IMultiselectModel {
	value: string;
	text: string;
}

interface IForm {
	title: string | undefined;
	description: string | undefined;
	status: IMultiselectModel | undefined;
}

const form: IForm = reactive({
	title: undefined,
	description: undefined,
	status: undefined,
});

interface IOptions {
	status: Array<IMultiselectModel>;
}

const options: IOptions = reactive({
	status: [
		{
			value: 'todo',
			text: 'A fazer',
		},
		{
			value: 'done',
			text: 'Pronto',
		},
		{
			value: 'inprogress',
			text: 'Em progresso',
		},
	],
});

const show = useVModel(props, 'modelValue', emit);
const todosStore = useTodosStore();
const route = useRoute();

const componentInfo = computed(() => {
	if (props.id) {
		return {
			title: 'Editar a fazer',
			description: 'Atualize os campos do seguinte item',
			button: 'Salvar',
		};
	}
	return {
		title: 'Criar novo a fazer',
		description: 'Preencha os campos para criar um novo elemento na lista',
		button: 'Criar',
	};
});

const listId = computed(() => {
	return route.params.id as string;
});

const closeModal = () => {
	show.value = false;
};

const resetModal = () => {
	form.title = undefined;
	form.description = undefined;
	form.status = undefined;
};

const getTodo = () => {
	if (!props.id) return;
	const params = {
		listId: toValue(listId),
		todoId: props.id,
	};
	todosStore.GET_TODO(params).then((todo) => {
		form.title = todo.name;
		form.description = todo.description;
		const status = getAvailableStatus(todo.status);
		form.status = {
			value: status.id,
			text: status.name,
		};
	});
};

const onSave = () => {
	if (!(form.title && form.description && form.status)) return;
	const body = {
		name: form.title,
		description: form.description,
		status: form.status.value,
	};
	if (props.id) {
		const params = {
			listId: toValue(listId),
			todoId: props.id,
		};
		return todosStore.EDIT_TODO({ params, body }).then(() => {
			closeModal();
			if (props.callback) props.callback();
		});
	}
	const params = {
		listId: toValue(listId),
	};
	todosStore.CREATE_TODO({ params, body }).then(() => {
		closeModal();
		if (props.callback) props.callback();
	});
};
</script>

<style lang="scss" scoped>
.new-task-modal {
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
