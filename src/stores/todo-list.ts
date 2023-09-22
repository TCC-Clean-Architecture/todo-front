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

interface IReponseMessage<T> {
	content: T;
	description: string;
	message: string;
	statusCode: number;
	type: string;
}

type ITodoBasic = Omit<ITodo, '_id' | 'createdAt'>;

export const useTodoListStore = defineStore('todo-list', {
	actions: {
		GET_TODOS(): Promise<ITodo[]> {
			return new Promise((resolve, reject) => {
				http({
					method: 'GET',
					url: '/todos',
				})
					.then((response: AxiosResponse<IReponseMessage<ITodo[]>>) => {
						resolve(response.data.content);
					})
					.catch((error: AxiosError) => {
						reject(error);
					});
			});
		},
		GET_TODO(id: string): Promise<ITodo> {
			return new Promise((resolve, reject) => {
				http({
					method: 'GET',
					url: `/todos/${id}`,
				})
					.then((response: AxiosResponse<IReponseMessage<ITodo>>) => {
						resolve(response.data.content);
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
					url: '/todos',
					data: body,
				})
					.then((response: AxiosResponse<IReponseMessage<ITodo>>) => {
						resolve(response.data.content);
					})
					.catch((error: AxiosError) => {
						reject(error);
					});
			});
		},
		EDIT_TODO(id: string, body: ITodoBasic): Promise<ITodo> {
			return new Promise((resolve, reject) => {
				http({
					method: 'PUT',
					url: `/todos/${id}`,
					data: body,
				})
					.then((response: AxiosResponse<IReponseMessage<ITodo>>) => {
						resolve(response.data.content);
					})
					.catch((error: AxiosError) => {
						reject(error);
					});
			});
		},
		DELETE_TODO(id: string): Promise<Pick<ITodo, '_id'>> {
			return new Promise((resolve, reject) => {
				http({
					method: 'DELETE',
					url: `/todos/${id}`,
				})
					.then((response: AxiosResponse<IReponseMessage<Pick<ITodo, '_id'>>>) => {
						resolve(response.data.content);
					})
					.catch((error: AxiosError) => {
						reject(error);
					});
			});
		},
	},
});
