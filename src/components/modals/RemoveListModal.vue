<template>
	<BaseModal class="remove-list-modal" v-model="show" width="420px">
		<div class="remove-list-modal__content">
			<h2 class="remove-list-modal__title">Remover lista</h2>
			<p class="remove-list-modal__description">Você tem certeza que deseja excluir a lista?</p>
			<p class="remove-list-modal__description">
				Caso escolha essa opção, sua lista será excluída e você perderá todas tarefas.
			</p>
		</div>

		<template #footer>
			<div class="remove-list-modal__actions">
				<button class="remove-list-modal__delete" @click="removeList()">Excluir</button>
				<button class="remove-list-modal__cancel" @click="show = false">Cancelar</button>
			</div>
		</template>
	</BaseModal>
</template>

<script lang="ts" setup>
import BaseModal from '@/components/BaseModal.vue';

import { useVModel } from '@vueuse/core';
import { useListsStore } from '@/stores/lists';

interface IProps {
	modelValue: boolean;
	id?: string;
	callback?: () => void;
}

const props = withDefaults(defineProps<IProps>(), {
	modelValue: false,
});

const emit = defineEmits<{
	(e: 'update:modelValue', value: boolean): void;
}>();

const show = useVModel(props, 'modelValue', emit);
const listsStore = useListsStore();

const closeModal = () => {
	show.value = false;
};

const removeList = () => {
	if (!props.id) return;
	listsStore.DELETE_LIST(props.id).then(() => {
		closeModal();
		if (props.callback) props.callback();
	});
};
</script>

<style lang="scss" scoped>
.remove-list-modal {
	$self: &;
	&__title {
		margin-block: 1rem;
		text-align: center;
		color: var(--clr-primary);
	}
	&__content {
		display: flex;
		flex-direction: column;

		padding-inline: 2rem;

		#{$self}__description {
			margin-block-end: 1rem;

			color: var(--clr-primary-lighter);
			text-align: center;
		}
	}

	&__actions {
		display: flex;
		justify-content: center;
		gap: 0.5rem;

		padding-block: 2rem;
	}

	&__delete {
		height: 40px;
		min-width: 140px;
		padding-inline: 1.5rem;

		color: var(--clr-text-inverse-1);
		font-weight: 600;

		background-color: var(--clr-danger);
		border-radius: 100vw;

		transition: background-color 200ms ease-in-out;

		&:hover {
			background-color: var(--clr-danger-dark);
		}
	}

	&__cancel {
		height: 40px;
		min-width: 140px;
		padding-inline: 1.5rem;

		color: var(--clr-text-1);
		font-weight: 600;

		border-radius: 100vw;

		transition: background-color 200ms ease-in-out;

		&:hover {
			background-color: var(--clr-gray-lightest);
		}
	}
}
</style>
@/stores/lists
