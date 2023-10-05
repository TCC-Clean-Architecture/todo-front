import Http from '@/utils/axios';
import type { AxiosError, AxiosResponse } from 'axios';
import { defineStore } from 'pinia';

const http = Http.getInstance();

interface ITodo {
	_id: string;
	name: string;
	description: string;
	status: string;
	createdAt: string;
}

interface ITodoParamsIDs {
	listId: string;
	todoId: string;
}

interface IReponseMessage<T> {
	content: T;
	description: string;
	message: string;
	statusCode: number;
	type: string;
}

type ITodoBasic = Omit<ITodo, '_id' | 'createdAt'>;

interface ICreateTodoPayload {
	params: Pick<ITodoParamsIDs, 'listId'>;
	body: ITodoBasic;
}

interface IEditTodoPayload {
	params: ITodoParamsIDs;
	body: ITodoBasic;
}

export const useTodosStore = defineStore('todos', {
	actions: {
		GET_TODO({ listId, todoId }: ITodoParamsIDs): Promise<ITodo> {
			return new Promise((resolve, reject) => {
				http({
					method: 'GET',
					url: `/todos/${todoId}/list/${listId}`,
				})
					.then((response: AxiosResponse<IReponseMessage<ITodo>>) => {
						resolve(response.data.content);
					})
					.catch((error: AxiosError) => {
						reject(error);
					});
			});
		},
		CREATE_TODO({ params, body }: ICreateTodoPayload): Promise<ITodo> {
			return new Promise((resolve, reject) => {
				http({
					method: 'POST',
					url: `/todos/list/${params.listId}`,
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
		EDIT_TODO({ params, body }: IEditTodoPayload): Promise<Omit<ITodo, 'createdAt'>> {
			return new Promise((resolve, reject) => {
				http({
					method: 'PUT',
					url: `/todos/${params.todoId}/list/${params.listId}`,
					data: body,
				})
					.then((response: AxiosResponse<IReponseMessage<Omit<ITodo, 'createdAt'>>>) => {
						resolve(response.data.content);
					})
					.catch((error: AxiosError) => {
						reject(error);
					});
			});
		},
		DELETE_TODO({ listId, todoId }: ITodoParamsIDs): Promise<Pick<ITodo, '_id'>> {
			return new Promise((resolve, reject) => {
				http({
					method: 'DELETE',
					url: `/todos/${todoId}/list/${listId}`,
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
