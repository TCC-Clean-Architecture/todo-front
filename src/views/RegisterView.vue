<template>
	<main class="register">
		<img class="register__background" :src="background" />
		<section class="register__content">
			<div class="register__card">
				<div class="register__content">
					<Logo2DO4U class="register__logo" />
					<h1 class="register__title">Criar conta</h1>
					<p class="register__description">
						Crie sua conta para desfrutar da melhor<br />plataforma de organizacao de tarefas.
					</p>
					<form @submit.prevent class="register__form">
						<BaseInput
							class="register__name"
							v-model="form.name"
							:invalid="error === 'fillFields'"
							variant="outline"
							type="text"
							name="name"
							placeholder="Nome"
							required
						/>
						<BaseInput
							class="register__email"
							v-model="form.email"
							:invalid="error === 'fillFields' || error === 'registerFailed'"
							variant="outline"
							type="text"
							name="email"
							placeholder="Email"
							required
						/>
						<BasePassword
							class="register__password"
							v-model="form.password"
							:invalid="error === 'fillFields' || error === 'incompatiblePasswords'"
							variant="outline"
							name="password"
							placeholder="Senha"
							required
							@update:model-value="checkPassword($event as string, 'password')"
						/>
						<BasePassword
							class="register__confirm-password"
							v-model="form.confirmPassword"
							:invalid="error === 'fillFields' || error === 'incompatiblePasswords'"
							:feedback="feedback.password"
							variant="outline"
							name="confirm-password"
							placeholder="Confirmar senha"
							required
						/>
						<p v-if="error" class="register__error" v-text="errors[error]"></p>
						<button class="register__button" @click="doRegister()">
							<Transition name="scale-up" mode="out-in">
								<BaseLoader v-if="loading" variant="white" floating center />
								<span v-else>Criar</span>
							</Transition>
						</button>
						<span class="register__go-login">
							Já possui uma conta?
							<RouterLink to="login" class="register__link"> Entre aqui </RouterLink>
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
	name: string | null;
	email: string | null;
	password: string | null;
	confirmPassword: string | null;
}

const form: IForm = reactive({ name: null, email: null, password: null, confirmPassword: null });

interface IFeedback {
	width?: string;
	color?: string;
	text?: string;
	status?: boolean;
}

interface IFeedbackObject {
	password: IFeedback;
}

const feedback: IFeedbackObject = reactive({ password: {} });
type FeedbackKeys = keyof typeof feedback;

const errors = {
	fillFields: 'Preencha os campos para se cadastrar.',
	incompatiblePasswords: 'As senhas são incompatíveis. Por favor, verifique-as e tente novamente.',
	registerFailed:
		'Não foi possível cadastrar esse usuário, por favor verifique se o e-mail já foi registrado ou se o domínio é válido e tente novamente.',
};
type ErrorsKeys = keyof typeof errors;

const error = ref<ErrorsKeys>();
const loading = ref<boolean>(false);

const background = computed(() => backgroundImage);
const validation = computed(
	() => !form.name || !form.email || !form.password || !form.confirmPassword,
);
const passowordValidation = computed(
	() => !feedback.password?.status || form.password !== form.confirmPassword,
);

const checkPassword = (text: string, name: FeedbackKeys) => {
	if (!text) return;
	// eslint-disable-next-line no-useless-escape
	const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
	let count = 0;

	if (text.length >= 0) {
		count++;
		if (/\d/.test(text)) count++;
		if (specialChars.test(text)) count++;
	}

	switch (count) {
		case 1:
			feedback[name] = {
				width: '33%',
				color: '#e62737',
				text: 'Senha fraca',
				status: true,
			};
			break;
		case 2:
			feedback[name] = {
				width: '66%',
				color: '#ff9f10',
				text: 'Senha mediana',
				status: true,
			};
			break;
		case 3:
			feedback[name] = {
				width: '100%',
				color: '#5dc90a',
				text: 'Senha forte!',
				status: true,
			};
			break;
	}
};

const doRegister = () => {
	error.value = undefined;

	if (validation.value) {
		error.value = 'fillFields';
		return;
	}

	if (passowordValidation.value) {
		error.value = 'incompatiblePasswords';
		return;
	}

	loading.value = true;

	const body = {
		name: form.name!,
		email: form.email!,
		password: form.password!,
	};

	authStore
		.REGISTER_USER(body)
		.then(() => {
			router.push({ name: 'Login' });
		})
		.catch(() => {
			error.value = 'registerFailed';
		})
		.finally(() => {
			loading.value = false;
		});
};
</script>

<style lang="scss" scoped>
.register {
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

		#{$self}__name,
		#{$self}__email,
		#{$self}__password {
			margin-block-end: 1rem;
		}

		#{$self}__confirm-password {
			margin-block-end: 0.375rem;
		}

		#{ $self }__error {
			margin-block: 0.5rem 0.75rem;
			margin-inline: 0.5rem;

			font-size: 0.75rem;
			font-weight: 500;
			align-self: flex-start;
			text-align: left;
			color: var(--clr-danger);
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

		#{$self }__go-login {
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
