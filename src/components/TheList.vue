<template>
	<section class="list">
		<h1 class="list__title">Lista de Atividades</h1>
		<Draggable
			tag="ol"
			class="list__wrapper"
			handle=".task__handle"
			v-model="tasks"
			group="tasks"
			item-key="id"
			:animation="200"
		>
			<template #item="{ element }">
				<li class="list__task">
					<div class="task">
						<button class="task__handle"><IconGripSquares /></button>
						<div class="task__content">
							<h3 class="task__name">{{ element.name }}</h3>
							<p class="task__description">
								{{ element.description }}
							</p>
							<span class="task__status" :class="{ [`task__status--${element.status}`]: true }">
								{{ getStatusName(element.status) }}
							</span>
						</div>
						<div class="task__actions">
							<button class="task__action" @click="openRemoveTaskModal(element.id)">
								<IconTrash />
							</button>
							<button class="task__action" @click="openNewEditTaskModal(element.id)">
								<IconPencil />
							</button>
						</div>
					</div>
				</li>
			</template>
			<template #footer>
				<button class="list__new-task" @click="openNewEditTaskModal()"><IconPlus /></button>
			</template>
		</Draggable>
	</section>
	<NewEditTaskModal
		v-model="modals.newEditTask.modalOpen"
		:id="modals.newEditTask.props.id"
		:callback="modals.newEditTask.props.callback"
	/>
	<RemoveTaskModal
		v-model="modals.removeTask.modalOpen"
		:id="modals.removeTask.props.id"
		:callback="modals.removeTask.props.callback"
	/>
</template>

<script lang="ts" setup>
import IconGripSquares from '@/components/icons/IconGripSquares.vue';
import IconPencil from '@/components/icons/IconPencil.vue';
import IconTrash from '@/components/icons/IconTrash.vue';
import IconPlus from '@/components/icons/IconPlus.vue';
import NewEditTaskModal from '@/components/modals/NewEditTaskModal.vue';
import RemoveTaskModal from '@/components/modals/RemoveTaskModal.vue';
import Draggable from 'vuedraggable';

import { ref, reactive, computed, toValue, onMounted } from 'vue';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import { useListsStore } from '@/stores/lists';
import getAvailableStatus from '@/utils/getAvailableStatus';

interface IGenericModal<T = undefined> {
	modalOpen: boolean;
	props: T;
}

interface IModalProps {
	id?: string;
	callback?: () => void;
}

interface IModals {
	newEditTask: IGenericModal<IModalProps>;
	removeTask: IGenericModal<IModalProps>;
}

const modals: IModals = reactive({
	newEditTask: {
		modalOpen: false,
		props: {
			callback: undefined,
		},
	},
	removeTask: {
		modalOpen: false,
		props: {
			id: undefined,
			callback: undefined,
		},
	},
});
const listsStore = useListsStore();
const route = useRoute();

type ITodo = {
	id: string | number;
	name: string;
	description: string;
	status: string;
};

const tasks = ref<ITodo[]>([]);

const listId = computed(() => {
	return route.params.id as string;
});

const openRemoveTaskModal = (id: string) => {
	modals.removeTask.props.id = id;
	modals.removeTask.modalOpen = true;
	modals.removeTask.props.callback = () => removeTodo(id);
};

const openNewEditTaskModal = (id?: string) => {
	modals.newEditTask.props.id = id;
	modals.newEditTask.modalOpen = true;
	modals.newEditTask.props.callback = () => getTodos(toValue(listId));
};

const removeTodo = (id: string) => {
	if (id) {
		tasks.value = tasks.value.filter((t) => t.id !== id);
	}
};

const getStatusName = (status: string) => {
	return getAvailableStatus(status).name;
};

const getTodos = (id: string) => {
	listsStore.GET_LIST(id).then((todos) => {
		tasks.value = todos.map((todo) => ({
			id: todo._id,
			name: todo.name,
			description: todo.description,
			status: getAvailableStatus(todo.status).id,
		}));
	});
};

onBeforeRouteUpdate((to, from) => {
	if (to.params.id !== from.params.id) {
		getTodos(to.params.id as string);
	}
});

onMounted(() => {
	const id = toValue(listId);
	getTodos(id);
});
</script>

<style lang="scss" scoped>
.list {
	$self: &;
	display: flex;
	flex-direction: column;
	gap: 1rem;

	margin-block-start: 0.25rem;

	&__title {
		display: block;

		padding-block: 0.25rem;
		padding-inline: 1rem;

		color: var(--clr-primary);
		font-size: 2rem;
		font-weight: 700;

		background-color: var(--clr-bg-soft);
		border-radius: 0.5rem;
	}

	&__wrapper {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;

		background-color: var(--clr-bg-soft);
		border-radius: 0.5rem;
		padding: 1.75rem;

		list-style: none;
	}

	&__new-task {
		display: grid;
		place-items: center;

		padding-block: 1rem;

		background-color: var(--clr-bg-soft-up);
		color: var(--clr-secondary);

		border-radius: 0.25rem;

		transition: background-color 150ms ease-in-out;

		&:hover {
			background-color: var(--clr-secondary-lightest);

			svg {
				scale: 1.1;
			}
		}

		svg {
			width: 1.25rem;
			height: 1.25rem;

			transition: scale 100ms ease-in-out;
		}
	}
}

.task {
	position: relative;

	display: grid;
	grid-template-columns: 2.5rem 1fr 1.5rem;

	min-height: 13rem;
	padding: 0.75rem;

	background-color: var(--clr-bg-soft);
	box-shadow: $elevation-2;
	border-radius: 0.375rem;

	&__content {
		display: flex;
		flex-direction: column;
		margin-block: 1rem 0.5rem;
		margin-inline-start: 1rem;
	}

	&__name {
		color: var(--clr-primary);
		font-size: 1.125rem;
		font-weight: 700;

		margin-block-end: 0.5rem;
	}

	&__description {
		color: var(--clr-primary-lighter);
		font-size: 1rem;
		font-weight: 400;
	}

	&__status {
		margin-block-start: auto;
		align-self: flex-end;

		display: flex;
		align-items: center;
		justify-content: center;

		height: 28px;
		padding-inline: 1.25rem;

		font-size: 0.75rem;
		font-weight: 600;
		color: var(--clr-text-inverse-1);

		background-color: var(--clr-primary);
		border-radius: 0.625rem;

		&--done {
			background-color: var(--clr-success);
		}
		&--inprogress {
			background-color: var(--clr-warning);
		}
		&--todo {
			background-color: var(--clr-info);
		}
		&--unknown {
			background-color: var(--clr-mute);
			color: var(--clr-mute-darker);
		}
	}

	&__handle {
		background-color: var(--clr-bg-soft-up);
		color: var(--clr-secondary);

		border-radius: 0.25rem;

		cursor: grab;

		transition: background-color 150ms ease-in-out;

		&:hover {
			background-color: var(--clr-secondary-lightest);

			svg {
				scale: 1.1;
			}
		}

		svg {
			width: 2rem;
			height: 2rem;

			transition: scale 150ms ease-in-out;
		}
	}

	&__actions {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	&__action {
		width: 1.5rem;
		height: 1.5rem;
		padding: 0.125rem;

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
</style>
@/stores/lists
