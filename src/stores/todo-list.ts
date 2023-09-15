import api from '@/utils/axios';
import type { AxiosError, AxiosResponse } from 'axios';
import { defineStore } from 'pinia';

const { http } = api.getInstance();

type ITodo = {
	_id: string;
	name: string;
	description: string;
	status: string;
	createdAt: string;
};

type ITodoList = Array<ITodo>;

type ITodoBasic = Omit<ITodo, '_id' | 'createdAt'>;

export const useTodoListStore = defineStore('todo-list', {
	actions: {
		GET_TODOS(): Promise<ITodoList> {
			return new Promise((resolve, reject) => {
				http({
					method: 'GET',
					url: '/todo',
				})
					.then((response: AxiosResponse<ITodoList>) => {
						resolve(response.data);
					})
					.catch((error: AxiosError) => {
						reject(error);
					});
			});
		},
		CREATE_TODO(body: ITodoBasic): Promise<ITodo> {
			return new Promise((resolve, reject) => {
				http({
					method: 'POST',
					url: '/todo',
					data: body,
				})
					.then((response: AxiosResponse<ITodo>) => {
						resolve(response.data);
					})
					.catch((error: AxiosError) => {
						reject(error);
					});
			});
		},
	},
});
