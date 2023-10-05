<template>
	<div class="register__card">
		<Logo2DO4U class="register__logo" />
		<IconCheck class="register__check" color="#5DC90A" filled />
		<p class="register__description">Cadastro realizado com sucesso!</p>
		<RouterLink to="/login" class="register__go-login"> Voltar para o login </RouterLink>
	</div>
</template>

<script setup lang="ts">
import Logo2DO4U from '@/components/icons/Logo2DO4U.vue';
import IconCheck from '@/components/icons/IconCheck.vue';
</script>

<style lang="scss" scoped>
.register {
	$self: &;

	&__card {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1.5rem;

		padding: 4rem;

		background-color: var(--clr-bg-soft);
		border-radius: 1.25rem;
	}

	&__logo {
		width: 240px;
		height: auto;
		margin-block-end: 2rem;
	}

	&__check {
		$size: 2.5rem;
		width: $size;
		height: $size;
	}

	&__description {
		font-size: 1.125rem;
		text-align: center;
		line-height: 1.75rem;
		letter-spacing: 1px;

		color: var(--clr-primary-lighter);

		margin-block-end: 2rem;
	}

	&__go-login {
		color: var(--clr-secondary);

		transition: color 100ms ease-in-out;

		&:hover {
			color: var(--clr-secondary-dark);
		}
	}
}
</style>
