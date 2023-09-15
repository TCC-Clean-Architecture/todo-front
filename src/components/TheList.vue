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
						<button class="task__edit" @click="showNewTaskModal = true"><IconPencil /></button>
					</div>
				</li>
			</template>
			<template #footer>
				<button class="list__new-task" @click="showNewTaskModal = true"><IconPlus /></button>
			</template>
		</Draggable>
	</section>
	<NewTaskModal v-model="showNewTaskModal" />
</template>

<script lang="ts" setup>
import IconGripSquares from '@/components/icons/IconGripSquares.vue';
import IconPencil from '@/components/icons/IconPencil.vue';
import IconPlus from '@/components/icons/IconPlus.vue';
import NewTaskModal from '@/components/modals/NewTaskModal.vue';
import Draggable from 'vuedraggable';

import { ref, onMounted } from 'vue';
import { useTodoListStore } from '@/stores/todo-list';
import getAvailableStatus from '@/utils/getAvailableStatus';

const showNewTaskModal = ref<boolean>(false);
const todoListStore = useTodoListStore();

type ITodo = {
	id: string | number;
	name: string;
	description: string;
	status: string;
};

const tasks = ref<ITodo[]>([
	{
		id: 1,
		name: `Option to "use local/server version" feature`,
		description: `It usually displays this message when you close an unsaved page when you do it on purpose, and it's getting frustrated to see this every time.`,
		status: 'Status',
	},
	{
		id: 2,
		name: `Option to "use local/server version" feature`,
		description: `It usually displays this message when you close an unsaved page when you do it on purpose, and it's getting frustrated to see this every time.`,
		status: 'Status',
	},
	{
		id: 3,
		name: `Option to "use local/server version" feature`,
		description: `It usually displays this message when you close an unsaved page when you do it on purpose, and it's getting frustrated to see this every time.`,
		status: 'Status',
	},
]);

const getStatusName = (status: string) => {
	return getAvailableStatus(status).name;
};

const getTodos = () => {
	todoListStore['GET_TODOS']().then((todos) => {
		tasks.value = todos.map((todo) => ({
			id: todo._id,
			name: todo.name,
			description: todo.description,
			status: getAvailableStatus(todo.status).id,
		}));
	});
};

onMounted(() => {
	getTodos();
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

	&__edit {
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
