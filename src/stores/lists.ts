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

export const useListsStore = defineStore('lists', {
	actions: {
		GET_LISTS(): Promise<ITodo[]> {
			return new Promise((resolve, reject) => {
				http({
					method: 'GET',
					url: '/todos/lists',
				})
					.then((response: AxiosResponse<IReponseMessage<ITodo[]>>) => {
						resolve(response.data.content);
					})
					.catch((error: AxiosError) => {
						reject(error);
					});
			});
		},
		GET_LIST(id: string): Promise<ITodo[]> {
			return new Promise((resolve, reject) => {
				http({
					method: 'GET',
					url: `/todos/list/${id}`,
				})
					.then((response: AxiosResponse<IReponseMessage<ITodo[]>>) => {
						resolve(response.data.content);
					})
					.catch((error: AxiosError) => {
						reject(error);
					});
			});
		},
		CREATE_LIST(body: ITodoBasic): Promise<ITodo> {
			return new Promise((resolve, reject) => {
				http({
					method: 'POST',
					url: '/todos/list',
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
		DELETE_LIST(id: string): Promise<Pick<ITodo, '_id'>> {
			return new Promise((resolve, reject) => {
				http({
					method: 'DELETE',
					url: `/todos/list/${id}`,
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
