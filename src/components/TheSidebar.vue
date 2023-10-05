<template>
	<aside class="sidebar" :class="{ 'sidebar--collapsed': collapse }">
		<button class="sidebar__button-collapse" @click="collapse = !collapse">
			<IconAngles />
		</button>
		<div class="sidebar__wrapper">
			<i class="sidebar__logo">
				<LogoCollapsed2DO4U v-if="collapse" />
				<Logo2DO4U v-else />
			</i>
			<hr class="sidebar__divider" />
		</div>
		<section class="sidebar__lists">
			<button class="lists__create-button" @click="openNewListModal()">
				<i class="lists__icon"><IconPlus /></i>
				<span v-show="!collapse">Lista</span>
			</button>

			<ul class="lists">
				<li v-for="list in todoLists" :key="list.id" class="lists__list">
					<button
						class="list"
						:class="{ 'list--active': isListUsed(list.id) }"
						@click="useList(list.id)"
					>
						<i class="list__icon"><IconList /></i>
						<span v-show="!collapse" v-text="list.name" />
						<button
							v-show="!collapse"
							class="list__delete-button"
							@click="openRemoveListModal(list.id)"
						>
							<i class="list__icon"><IconTrash /></i>
						</button>
					</button>
				</li>
			</ul>
		</section>
		<div class="sidebar__misc">
			<span class="sidebar__user" :title="authStore.username" v-text="userLetter" />
			<SwitchColorTheme v-if="!collapse" />
			<button v-if="!collapse" class="sidebar__logout" @click="doLogout()">
				<IconSignOut />
			</button>
		</div>
		<NewListModal v-model="modals.newList.modalOpen" :callback="modals.newList.props.callback" />
		<RemoveListModal
			v-model="modals.removeList.modalOpen"
			:id="modals.removeList.props.id"
			:callback="modals.removeList.props.callback"
		/>
	</aside>
</template>

<script lang="ts" setup>
import Logo2DO4U from '@/components/icons/Logo2DO4U.vue';
import LogoCollapsed2DO4U from '@/components/icons/LogoCollapsed2DO4U.vue';
import IconAngles from '@/components/icons/IconAngles.vue';
import IconPlus from '@/components/icons/IconPlus.vue';
import IconList from '@/components/icons/IconList.vue';
import IconTrash from '@/components/icons/IconTrash.vue';
import IconSignOut from '@/components/icons/IconSignOut.vue';
import SwitchColorTheme from '@/components/SwitchColorTheme.vue';
import NewListModal from '@/components/modals/NewListModal.vue';
import RemoveListModal from '@/components/modals/RemoveListModal.vue';

import { computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useVModel } from '@vueuse/core';
import { useListsStore } from '@/stores/lists';
import { useAuthStore } from '@/stores/auth';

interface IGenericModal<T = undefined> {
	modalOpen: boolean;
	props: T;
}

interface IModalProps {
	id?: string;
	callback?: (id?: string) => void;
}

interface IModals {
	newList: IGenericModal<IModalProps>;
	removeList: IGenericModal<IModalProps>;
}

const props = defineProps<{
	modelValue: boolean;
}>();

const emit = defineEmits<{
	(e: 'update:modelValue', value: boolean): void;
}>();

const collapse = useVModel(props, 'modelValue', emit);
const router = useRouter();
const route = useRoute();
const listsStore = useListsStore();
const authStore = useAuthStore();

const modals: IModals = reactive({
	newList: {
		modalOpen: false,
		props: {
			callback: undefined,
		},
	},
	removeList: {
		modalOpen: false,
		props: {
			id: undefined,
			callback: undefined,
		},
	},
});

const userLetter = computed(() => {
	if (authStore.username) return authStore.username[0];
	return '?';
});

const todoLists = computed(() => {
	return listsStore.getLists.map((list) => ({
		id: list._id,
		name: list.name,
	}));
});

const openNewListModal = () => {
	modals.newList.modalOpen = true;
	modals.newList.props.callback = (id) => {
		if (id) useList(id);
	};
};

const openRemoveListModal = (id: string) => {
	modals.removeList.props.id = id;
	modals.removeList.modalOpen = true;
	modals.removeList.props.callback = () => {
		router.push({ name: 'Lists' });
	};
};

const getLists = () => {
	listsStore.GET_LISTS();
};

const isListUsed = (id: string) => {
	return route.params.id === id;
};

const useList = (id: string) => {
	router.push({ name: 'ListsViewList', params: { id } });
};

const doLogout = () => {
	authStore.AUTH_LOGOUT();
	router.push({ name: 'Login' });
};

onMounted(() => {
	getLists();
});
</script>

<style lang="scss" scoped>
@use 'sass:math';

.sidebar {
	$self: &;
	position: relative;

	display: flex;
	flex-direction: column;

	height: 100%;
	padding-block: 1.5rem;

	background-color: var(--clr-bg-soft);

	border-radius: 0.25rem;

	&:hover {
		#{$self}__button-collapse {
			visibility: visible;
			opacity: 1;
		}
	}

	&--collapsed {
		padding-block: 1rem;

		#{$self}__wrapper {
			margin-inline: 0.5rem;
		}

		#{$self}__logo {
			margin-inline: 0rem;
		}

		#{$self}__lists {
			margin-inline: 0.875rem;
		}

		& .list {
			padding-inline: unset;
		}

		#{$self}__button-collapse > svg {
			rotate: 180deg;
		}

		#{$self}__misc {
			margin-inline: 0.5rem;
			justify-content: center;
			padding: 0rem;
			box-shadow: none;
		}
	}

	&__wrapper {
		display: flex;
		flex-direction: column;
		margin-inline: 1rem;
	}

	&__logo {
		max-width: 100%;
		height: 2rem;
		margin-block: 1rem;
		margin-inline: 1.5rem;

		& > svg {
			max-width: inherit;
			height: inherit;
		}
	}

	&__divider {
		flex: 1 1 0px;
		display: block;

		max-width: 100%;
		height: 0px;
		max-height: 0px;

		border: solid;
		border-width: thin 0 0 0;

		border-color: var(--clr-primary-dimm-2);
	}

	&__lists {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		margin-block: 1rem;
		margin-inline: 1rem;
	}

	&__misc {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;

		margin-block-start: auto;
		margin-inline: 1rem;
		padding: 0.5rem;

		background-color: var(--clr-bg-soft);
		box-shadow: $elevation-2;
		border-radius: 100vw;
		overflow: hidden;

		& > * {
			flex: 0 0 auto;
		}
	}

	&__button-collapse {
		$button-size: 2rem;
		$half-size: math.div($button-size, 2);
		position: absolute;

		right: -$half-size;
		top: 2.5rem;

		display: grid;
		place-items: center;

		border-radius: 100vw;

		height: $button-size;
		width: $button-size;

		background-color: var(--clr-bg-soft-up);
		box-shadow: $elevation-1;
		visibility: hidden;
		opacity: 0;

		cursor: pointer;

		transition: all 150ms ease-in-out;

		&:hover {
			background-color: var(--clr-secondary);

			svg {
				color: var(--clr-text-light);
			}
		}

		& > svg {
			$size: 1.125rem;
			height: $size;
			width: $size;
			color: var(--clr-secondary);
		}
	}

	&__user {
		display: grid;
		place-items: center;

		width: 2.5rem;
		height: 2.5rem;

		color: var(--clr-secondary-contrast);
		background-color: var(--clr-secondary);
		border-radius: 100vw;

		font-size: 1.5rem;
		font-weight: bolder;
		user-select: none;
	}

	&__logout {
		width: 2.5rem;
		height: 2.5rem;
		padding: 0.25rem;

		color: var(--clr-secondary);

		background-color: var(--clr-bg-soft-up);
		border-radius: 100vw;

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

.lists {
	$self: &;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	list-style: none;

	&__create-button {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.25rem;

		height: 2.25rem;
		width: 100%;

		background-color: var(--clr-secondary);
		border-radius: 0.375rem;

		color: var(--clr-text-inverse-1);
		font-weight: 600;

		transition: background-color 200ms ease-in-out;

		&:hover {
			background-color: var(--clr-secondary-dark);
		}

		#{$self}__icon {
			display: grid;
			place-items: center;

			$size: 1.25rem;
			height: $size;
			width: $size;

			svg {
				width: inherit;
				height: inherit;
			}
		}
	}
}

.list {
	$self: &;
	flex: 1;
	width: 100%;

	position: relative;

	display: flex;
	align-items: center;
	gap: 0.25rem;

	height: 2.25rem;
	padding-inline: 0.5rem;

	color: var(--clr-mute-darkest);

	border-radius: 0.375rem;

	transition: all 150ms ease-in-out;

	&:hover {
		background-color: var(--clr-bg-soft-down);
	}

	&--active {
		color: var(--clr-primary);
		background-color: var(--clr-bg-soft-up);

		#{$self}__icon {
			color: var(--clr-secondary);
		}
	}

	span {
		font-size: 1rem;
		font-weight: 500;
		line-height: 1rem;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	&__delete-button {
		margin-inline-start: auto;
		display: grid;
		place-items: center;
		height: 2rem;

		color: var(--clr-mute);

		transition: scale 200ms ease-in-out;

		&:hover {
			scale: 1.1;
		}

		#{$self}__icon {
			display: grid;
			place-items: center;

			$size: 1.5rem;
			height: $size;
			width: $size;

			svg {
				width: inherit;
				height: inherit;
			}
		}
	}

	&__icon {
		display: grid;
		place-items: center;

		color: var(--clr-mute);

		$size: 2.25rem;
		height: $size;
		width: $size;

		& > svg {
			width: inherit;
			height: inherit;
		}
	}
}
</style>
