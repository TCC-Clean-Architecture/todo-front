<template>
	<main class="login">
		<img class="login__background" :src="background" />
		<section class="login__content">
			<div class="login__card">
				<div class="login__content">
					<Logo2DO4U class="login__logo" />
					<h1 class="login__title">Entrar</h1>
					<p class="login__description">
						Seja bem-vindo! Entre para<br />
						organizar suas tarefas de forma fácil<br />
						e rápida.
					</p>
					<form @submit.prevent class="login__form">
						<BaseInput
							class="login__user"
							v-model="form.email"
							:invalid="error === 'email' || error === 'loginFailed'"
							variant="outline"
							type="text"
							name="user"
							placeholder="Usuário"
							required
						/>
						<BasePassword
							class="login__password"
							v-model="form.password"
							:invalid="error === 'password' || error === 'loginFailed'"
							variant="outline"
							name="password"
							placeholder="Senha"
							required
						/>
						<p v-if="error && errors[error]" class="login__error" v-text="errors[error]"></p>
						<button class="login__button" @click="doLogin()">
							<Transition name="scale-up" mode="out-in">
								<BaseLoader v-if="loading" variant="white" floating center />
								<span v-else>Entrar</span>
							</Transition>
						</button>
						<span class="login__go-signin">
							Não é cadastrado?
							<RouterLink to="register" class="login__link"> Registre-se aqui </RouterLink>
						</span>
					</form>
				</div>
			</div>
		</section>
	</main>
</template>

<script setup lang="ts">
import backgroundImage from '@/assets/images/background.jpg';
import Logo2DO4U from '@/components/icons/Logo2DO4U.vue';
import BaseInput from '@/components/BaseInput.vue';
import BasePassword from '@/components/BasePassword.vue';
import BaseLoader from '@/components/BaseLoader.vue';

import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

interface IForm {
	email: string | null;
	password: string | null;
}

const form: IForm = reactive({ email: null, password: null });

const errors = {
	email: null,
	password: null,
	loginFailed:
		'Desculpe, não foi possível acessar sua conta. Por favor, verifique seu usuário ou senha e tente novamente.',
};
type ErrorsKeys = keyof typeof errors;

const error = ref<ErrorsKeys>();

const loading = ref<boolean>(false);

const background = computed(() => backgroundImage);

const doLogin = () => {
	if (!form.email) {
		error.value = 'email';
		return;
	}
	if (!form.password) {
		error.value = 'password';
		return;
	}

	loading.value = true;

	const body = {
		email: form.email,
		password: form.password,
	};

	authStore
		.AUTH_REQUEST(body)
		.then(() => {
			router.push({ name: 'Lists' });
		})
		.catch(() => {
			error.value = 'loginFailed';
		})
		.finally(() => {
			loading.value = false;
		});
};
</script>

<style lang="scss" scoped>
.login {
	$self: &;
	position: relative;
	height: 100vh;

	&__background {
		position: absolute;
		isolation: isolate;
		inset: 0;
		z-index: 0;
		width: 100vw;
		height: 100vh;
		object-fit: cover;
	}

	&__content {
		position: relative;
		z-index: 10;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	&__card {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: fit-content;
		background-color: var(--clr-bg-soft);
		border-radius: 1.25rem;

		#{$self}__content {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 4rem;
			gap: 1.5rem;
		}
	}

	&__logo {
		width: 240px;
		height: auto;
	}

	&__title {
		font-weight: bold;
		font-size: 1.75rem;
		text-align: center;
		color: var(--clr-primary);
	}

	&__description {
		font-size: 1.125rem;
		text-align: center;
		line-height: 1.75rem;
		letter-spacing: 1px;

		color: var(--clr-primary-lighter);
	}

	&__form {
		width: max(260px, auto);
		display: flex;
		flex-direction: column;
		align-items: center;

		#{$self}__user {
			margin-block-end: 1rem;
		}

		#{$self}__password {
			margin-block-end: 0.375rem;
		}

		#{$self}__button {
			position: relative;

			height: 40px;
			width: 100%;
			margin-block: 2.5rem 1.5rem;

			background-color: var(--clr-secondary);
			border-radius: 100vw;

			color: var(--clr-text-inverse-1);
			font-weight: 600;

			transition: background-color 200ms ease-in-out;

			&:hover {
				background-color: var(--clr-secondary-dark);
			}
		}

		#{ $self }__error {
			color: $c-danger;
			align-self: flex-start;
			text-align: left;
			max-width: 250px;
			font-weight: 500;
			font-size: 12px;
			margin-block: 0.5rem 0.75rem;
			margin-inline: 0.5rem;
		}

		#{$self }__go-signin {
			font-weight: 500;
			font-size: 0.75rem;
			line-height: 17px;
			color: var(--clr-primary-dark);
		}

		#{$self }__link {
			color: var(--clr-primary-light);
			text-decoration: underline;

			transition:
				text-decoration 100ms ease-in-out,
				color 100ms ease-in-out;

			&:hover {
				text-decoration: none;
				color: var(--clr-primary);
			}
		}
	}

	.scale-up-enter-active,
	.scale-up-leave-active {
		transition: all 300ms cubic-bezier(1, 0.5, 0.8, 1);
	}

	.scale-up-enter,
	.scale-up-leave-to {
		transform: scale(0);
		opacity: 0;
	}
}
</style>
