import Http from '@/utils/axios';
import type { AxiosError, AxiosResponse } from 'axios';
import { StorageSerializers, useSessionStorage, type RemovableRef } from '@vueuse/core';
import { defineStore } from 'pinia';

const http = Http.getInstance();

interface IUser {
	_id: string;
	name: string;
	email: string;
	token: string;
}

type IUserBasic = Pick<IUser, 'name' | 'email'>;

interface IReponseMessage<T> {
	content: T;
	description: string;
	message: string;
	statusCode: number;
	type: string;
}

interface IListsStoreState {
	token: RemovableRef<string | null>;
	user: RemovableRef<IUserBasic | null>;
}

interface IAuthRequestPayload {
	email: string;
	password: string;
}

interface IRegisterUserPayload {
	name: string;
	email: string;
	password: string;
}

export const useAuthStore = defineStore('auth', {
	state: (): IListsStoreState => ({
		token: useSessionStorage<string | null>('token', null),
		user: useSessionStorage<IUserBasic | null>('user', null, {
			serializer: StorageSerializers.object,
		}),
	}),
	getters: {
		isAutenticated: (state) => !!state.token,
		username: (state) => state.user?.name,
		userEmail: (state) => state.user?.email,
	},
	actions: {
		AUTH_REQUEST(body: IAuthRequestPayload): Promise<IUser> {
			return new Promise((resolve, reject) => {
				http({
					method: 'POST',
					url: '/authenticate',
					data: body,
				})
					.then((response: AxiosResponse<IReponseMessage<IUser>>) => {
						const { content } = response.data;
						this.token = content.token;
						Http.defineToken(content.token);

						this.user = {
							name: content.name,
							email: content.email,
						};

						resolve(content);
					})
					.catch((error: AxiosError) => {
						this.AUTH_LOGOUT();
						reject(error);
					});
			});
		},
		REGISTER_USER(body: IRegisterUserPayload): Promise<void> {
			return new Promise((resolve, reject) => {
				http({
					method: 'POST',
					url: '/users/register',
					data: body,
				})
					.then((response: AxiosResponse<IReponseMessage<any>>) => {
						resolve(response.data.content);
					})
					.catch((error: AxiosError) => {
						reject(error);
					});
			});
		},
		AUTH_LOGOUT() {
			this.$reset();
			this.token = null;
			this.user = null;
		},
	},
});
